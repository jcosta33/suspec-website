(() => {
  const root = document.documentElement;
  const motionVars = [
    "--background-plane-origin-x",
    "--background-plane-origin-y",
    "--background-plane-perspective-x",
    "--background-plane-perspective-y",
    "--background-header-origin-x",
    "--background-header-origin-y",
    "--background-header-perspective-x",
    "--background-header-perspective-y",
    "--background-plane-normal-x",
    "--background-plane-normal-y",
    "--background-plane-rotate-x",
    "--background-plane-rotate-y",
    "--background-plane-shift-x",
    "--background-plane-shift-y",
    "--background-plane-drift-x",
    "--background-plane-drift-y",
    "--background-plane-drift-soft-x",
    "--background-plane-drift-soft-y",
    "--background-header-before-rotate-x",
    "--background-header-before-rotate-y",
    "--background-header-after-rotate-x",
    "--background-header-after-rotate-y",
    "--background-header-shift-x",
    "--background-header-shift-y",
    "--background-header-shift-soft-x",
    "--background-header-shift-soft-y",
    "--background-hero-edge-rotate-x",
    "--background-hero-edge-rotate-y",
    "--background-hero-motif-rotate-x",
    "--background-hero-motif-rotate-y",
    "--background-hero-shift-x",
    "--background-hero-shift-y",
  ];

  function normalizePath(value) {
    if (!value || value.startsWith("http")) return value;
    const url = new URL(value, window.location.origin);
    return url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
  }

  function currentMenu() {
    return {
      button: document.querySelector('[aria-controls="mobile-menu"]'),
      menu: document.querySelector("#mobile-menu"),
      overlay: document.querySelector("[data-mobile-menu-overlay]"),
      header: document.querySelector(".site-header"),
    };
  }

  function menuOpen() {
    const { button } = currentMenu();
    return button?.getAttribute("aria-expanded") === "true";
  }

  function updateHeader() {
    const { header } = currentMenu();
    if (!header) return;
    header.setAttribute(
      "data-nav-state",
      window.scrollY > 8 || menuOpen() ? "opaque" : "transparent",
    );
  }

  function focusablesIn(menu) {
    return Array.from(
      menu.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !el.hasAttribute("disabled") && !el.hidden);
  }

  function openMenu() {
    const { button, menu, overlay } = currentMenu();
    if (!button || !menu) return;
    button.setAttribute("aria-expanded", "true");
    menu.hidden = false;
    if (overlay) overlay.hidden = false;
    document.body.style.overflow = "hidden";
    updateHeader();
    focusablesIn(menu)[0]?.focus();
  }

  function closeMenu(restoreFocus = false) {
    const { button, menu, overlay } = currentMenu();
    if (!button || !menu) return;
    button.setAttribute("aria-expanded", "false");
    menu.hidden = true;
    if (overlay) overlay.hidden = true;
    document.body.style.overflow = "";
    updateHeader();
    if (restoreFocus) button.focus();
  }

  function startMenu() {
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const toggle = target.closest('[aria-controls="mobile-menu"]');
      const overlay = target.closest("[data-mobile-menu-overlay]");
      const menuLink = target.closest("#mobile-menu a[href]");

      if (toggle) {
        event.preventDefault();
        if (menuOpen()) closeMenu();
        else openMenu();
        return;
      }

      if (overlay) closeMenu(true);
      else if (menuLink) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const toggle =
        target instanceof Element
          ? target.closest('[aria-controls="mobile-menu"]')
          : null;
      if (toggle && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        if (menuOpen()) closeMenu(true);
        else openMenu();
        return;
      }

      if (!menuOpen()) return;
      const { menu } = currentMenu();
      if (!menu) return;

      if (event.key === "Escape") {
        closeMenu(true);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = focusablesIn(menu);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function startCopy() {
    const resetTimers = new WeakMap();

    function fallbackCopy(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        return document.execCommand("copy");
      } finally {
        document.body.removeChild(textarea);
      }
    }

    function setButtonState(button, state) {
      const label = button.getAttribute("data-copy-label") || "Copy";
      const compactLabel =
        button.getAttribute("data-copy-compact-label") || label;
      const ariaLabel = button.getAttribute("data-copy-aria-label") || label;
      const compactSuccessLabel =
        button.getAttribute("data-copy-compact-success-label") || "Copied";
      const copied = state === "copied";
      const copying = state === "copying";
      const failed = state === "failed";
      button.setAttribute("data-copied", copied ? "true" : "false");
      button.setAttribute("data-copying", copying ? "true" : "false");
      button.setAttribute("data-copy-error", failed ? "true" : "false");
      button.setAttribute("aria-busy", copying ? "true" : "false");
      button.setAttribute(
        "aria-label",
        copied
          ? "Copied"
          : copying
            ? "Copying"
            : failed
              ? "Copy failed. Retry"
              : ariaLabel,
      );
      button
        .querySelectorAll(".copy-button-label-current")
        .forEach((currentLabel, index) => {
          currentLabel.textContent = copying
            ? "..."
            : failed
              ? "Retry"
              : copied
                ? index === 0
                  ? "Copied"
                  : compactSuccessLabel
                : index === 0
                  ? label
                  : compactLabel;
        });
    }

    async function copyFromButton(button) {
      if (button.getAttribute("data-copying") === "true") return;
      const text = button.getAttribute("data-copy-text") || "";
      setButtonState(button, "copying");
      let copied = false;
      if (navigator.clipboard?.writeText) {
        try {
          await Promise.race([
            navigator.clipboard.writeText(text),
            new Promise((_, reject) =>
              window.setTimeout(
                () => reject(new Error("clipboard timeout")),
                800,
              ),
            ),
          ]);
          copied = true;
        } catch {
          copied = fallbackCopy(text);
        }
      } else {
        copied = fallbackCopy(text);
      }

      setButtonState(button, copied ? "copied" : "failed");
      const previousTimer = resetTimers.get(button);
      if (previousTimer) window.clearTimeout(previousTimer);
      resetTimers.set(
        button,
        window.setTimeout(() => setButtonState(button, "idle"), 1600),
      );
    }

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest("button.copy-button[data-copy-text]");
      if (!button) return;
      void copyFromButton(button);
    });
  }

  function updateRouteState() {
    const currentPath = normalizePath(window.location.pathname);
    document.querySelectorAll("[data-site-nav-link]").forEach((link) => {
      const linkPath = normalizePath(link.getAttribute("href"));
      const active =
        currentPath === linkPath ||
        (linkPath !== "/" && currentPath.startsWith(linkPath));
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function startRouteObserver() {
    let pathname = window.location.pathname;
    const observer = new MutationObserver(() => {
      if (window.location.pathname === pathname) return;
      pathname = window.location.pathname;
      updateRouteState();
      closeMenu(false);
      window.setTimeout(() => {
        const target =
          document.querySelector("#docs-primary-content") ||
          document.querySelector("#main-content");
        target?.focus({ preventScroll: true });
        const title = document.querySelector("h1")?.textContent?.trim();
        const announcer = document.querySelector("[data-route-announcer]");
        if (announcer && title) announcer.textContent = `${title} loaded`;
      }, 80);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("pagehide", () => observer.disconnect(), {
      once: true,
    });
  }

  function startTrace() {
    const rail = document.querySelector(".trace-rail");
    if (!rail) return;
    const readout = rail.querySelector(".trace-rail-readout");
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const active = scrollable > 160;
      const progress = active
        ? Math.min(
            100,
            Math.max(0, Math.round((window.scrollY / scrollable) * 100)),
          )
        : 0;
      rail.setAttribute("data-active", active ? "true" : "false");
      rail.setAttribute("data-started", progress > 2 ? "true" : "false");
      rail.style.setProperty("--trace-progress", `${progress}%`);
      if (readout)
        readout.textContent = `${progress.toString().padStart(2, "0")}%`;
    };

    const request = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    request();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
  }

  function startHeader() {
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  function startBackgroundMotion() {
    const canAnimate = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!canAnimate.matches) return;

    const motionGain = 0.125;
    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const writeMotion = () => {
      frame = 0;
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;

      const x = Math.max(-1, Math.min(1, currentX));
      const y = Math.max(-1, Math.min(1, currentY));
      const absX = Math.abs(x);
      const absY = Math.abs(y);

      root.style.setProperty("--background-plane-origin-x", "50%");
      root.style.setProperty("--background-plane-origin-y", "52%");
      root.style.setProperty(
        "--background-plane-perspective-x",
        `${50 + x * 8}%`,
      );
      root.style.setProperty(
        "--background-plane-perspective-y",
        `${52 + y * 6}%`,
      );
      root.style.setProperty("--background-header-origin-x", "50%");
      root.style.setProperty("--background-header-origin-y", "50%");
      root.style.setProperty(
        "--background-header-perspective-x",
        `${50 + x * 18}%`,
      );
      root.style.setProperty(
        "--background-header-perspective-y",
        `${48 + y * 13}%`,
      );
      root.style.setProperty("--background-plane-normal-x", x.toFixed(3));
      root.style.setProperty("--background-plane-normal-y", y.toFixed(3));
      root.style.setProperty(
        "--background-plane-rotate-x",
        `${(-y * 8.8).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-plane-rotate-y",
        `${(x * 10.8).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-plane-shift-x",
        `${(-x * 4.6).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-shift-y",
        `${(-y * 3.4).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-drift-x",
        `${(-x * 4.2).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-drift-y",
        `${(-y * 3.2).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-drift-soft-x",
        `${(-x * 2.1).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-drift-soft-y",
        `${(-y * 1.7).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-header-before-rotate-x",
        `${(-y * 5.8).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-header-before-rotate-y",
        `${(x * 6.8).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-header-after-rotate-x",
        `${(-y * 4.6).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-header-after-rotate-y",
        `${(x * 5.4).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-header-shift-x",
        `${(-x * (12.2 + absY * 1.6)).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-header-shift-y",
        `${(-y * (8.4 + absX * 1.2)).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-header-shift-soft-x",
        `${(-x * (6.4 + absY)).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-header-shift-soft-y",
        `${(-y * (4.8 + absX * 0.8)).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-hero-edge-rotate-x",
        `${(-y * 5.2).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-hero-edge-rotate-y",
        `${(x * 6.2).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-hero-motif-rotate-x",
        `${(-y * 6.4).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-hero-motif-rotate-y",
        `${(x * 7.4).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-hero-shift-x",
        `${(-x * (9.4 + absY * 1.8)).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-hero-shift-y",
        `${(-y * (7.2 + absX * 1.3)).toFixed(2)}px`,
      );

      if (
        Math.abs(targetX - currentX) > 0.003 ||
        Math.abs(targetY - currentY) > 0.003
      ) {
        frame = window.requestAnimationFrame(writeMotion);
      }
    };

    const request = () => {
      if (frame === 0) frame = window.requestAnimationFrame(writeMotion);
    };
    const settle = () => {
      targetX = 0;
      targetY = 0;
      request();
    };

    window.addEventListener(
      "pointermove",
      (event) => {
        targetX = (event.clientX / window.innerWidth - 0.5) * motionGain;
        targetY = (event.clientY / window.innerHeight - 0.5) * motionGain;
        request();
      },
      { passive: true },
    );
    window.addEventListener("pointerleave", settle);
    window.addEventListener("blur", settle);
    window.addEventListener("pagehide", () =>
      motionVars.forEach((name) => root.style.removeProperty(name)),
    );
  }

  let controlsStarted = false;
  let effectsStarted = false;

  function startControls() {
    if (controlsStarted) return;
    if (!document.querySelector(".site-header")) {
      window.requestAnimationFrame(startControls);
      return;
    }
    controlsStarted = true;
    startMenu();
    startCopy();
    startHeader();
    startRouteObserver();
  }

  function startEffects() {
    if (effectsStarted) return;
    if (!document.querySelector(".trace-rail")) {
      window.requestAnimationFrame(startEffects);
      return;
    }
    effectsStarted = true;
    startTrace();
    startBackgroundMotion();
  }

  const requestControls = () => window.requestAnimationFrame(startControls);
  const requestEffects = () => {
    window.setTimeout(() => window.requestAnimationFrame(startEffects), 1200);
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", requestControls, {
      once: true,
    });
  } else {
    requestControls();
  }
  if (document.readyState === "complete") requestEffects();
  else window.addEventListener("load", requestEffects, { once: true });
  const requestRouteState = () => window.requestAnimationFrame(updateRouteState);
  if (document.readyState === "complete") requestRouteState();
  else window.addEventListener("load", requestRouteState, { once: true });
})();
