(() => {
  const root = document.documentElement;

  const resetProperties = [
    "--background-plane-tilt-x",
    "--background-plane-tilt-y",
    "--background-plane-origin-x",
    "--background-plane-origin-y",
    "--background-plane-drift-x",
    "--background-plane-drift-y",
    "--background-header-drift-x",
    "--background-header-drift-y",
    "--background-header-tilt-x",
    "--background-header-tilt-y",
    "--background-plane-normal-x",
    "--background-plane-normal-y",
    "--background-plane-grid-x",
    "--background-plane-grid-y",
    "--background-plane-grid-minor-x",
    "--background-plane-grid-minor-y",
    "--background-header-grid-x",
    "--background-header-grid-y",
    "--background-header-origin-x",
    "--background-header-origin-y",
  ];

  function startBackgroundMotion() {
    const motionQuery = window.matchMedia(
      "(hover: hover) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight * 0.42;
    let tracking = false;
    const pointerMoveEvent =
      "PointerEvent" in window ? "pointermove" : "mousemove";

    function resetPointer() {
      for (const property of resetProperties) root.style.removeProperty(property);
    }

    function updatePointer() {
      frame = 0;
      const width = Math.max(window.innerWidth, 1);
      const height = Math.max(window.innerHeight, 1);
      const normalX = Math.max(-1, Math.min(1, (pointerX / width - 0.5) * 2));
      const normalY = Math.max(-1, Math.min(1, (pointerY / height - 0.5) * 2));

      root.style.setProperty("--background-plane-normal-x", normalX.toFixed(4));
      root.style.setProperty("--background-plane-normal-y", normalY.toFixed(4));
      root.style.setProperty(
        "--background-plane-tilt-x",
        `${(normalY * -2.1).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-plane-tilt-y",
        `${(normalX * 2.6).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-header-tilt-x",
        `${(normalY * -1.4).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-header-tilt-y",
        `${(normalX * 1.7).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-plane-origin-x",
        `${(50 + normalX * 5).toFixed(2)}%`,
      );
      root.style.setProperty(
        "--background-plane-origin-y",
        `${(52 + normalY * 3.5).toFixed(2)}%`,
      );
      root.style.setProperty(
        "--background-plane-drift-x",
        `${(-normalX * 3.6).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-drift-y",
        `${(-normalY * 2.8).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-header-drift-x",
        `${(-normalX * 2.8).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-header-drift-y",
        `${(-normalY * 2.2).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-header-origin-x",
        `${(50 + normalX * 6).toFixed(2)}%`,
      );
      root.style.setProperty(
        "--background-header-origin-y",
        `${(46 + normalY * 4).toFixed(2)}%`,
      );
      root.style.setProperty(
        "--background-plane-grid-x",
        `${(-normalX * 8).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-grid-y",
        `${(-normalY * 6).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-grid-minor-x",
        `${(-normalX * 4).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-grid-minor-y",
        `${(-normalY * 3).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-header-grid-x",
        `${(normalX * 6).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-header-grid-y",
        `${(normalY * 5).toFixed(2)}px`,
      );
    }

    function queuePointer(event) {
      if (!tracking) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame === 0) frame = window.requestAnimationFrame(updatePointer);
    }

    function startTracking() {
      if (tracking) return;
      tracking = true;
      document.addEventListener(pointerMoveEvent, queuePointer, {
        capture: true,
        passive: true,
      });
      updatePointer();
    }

    function stopTracking() {
      if (!tracking) return;
      tracking = false;
      document.removeEventListener(pointerMoveEvent, queuePointer, true);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      frame = 0;
      resetPointer();
    }

    function syncTracking() {
      if (motionQuery.matches) startTracking();
      else stopTracking();
    }

    function onResize() {
      pointerX = Math.max(0, Math.min(window.innerWidth, pointerX));
      pointerY = Math.max(0, Math.min(window.innerHeight, pointerY));
      syncTracking();
      if (tracking) updatePointer();
    }

    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", syncTracking);
    } else if (typeof motionQuery.addListener === "function") {
      motionQuery.addListener(syncTracking);
    }

    window.addEventListener("focus", syncTracking);
    window.addEventListener("pageshow", syncTracking);
    window.addEventListener("resize", onResize);
    syncTracking();
    window.setTimeout(syncTracking, 120);
  }

  function startMenuFallback() {
    const openMenu = () => {
      const button = document.querySelector('[aria-controls="mobile-menu"]');
      const menu = document.querySelector("#mobile-menu");
      const overlay = document.querySelector("[data-mobile-menu-overlay]");
      if (!button || !menu) return;

      button.setAttribute("aria-expanded", "true");
      menu.hidden = false;
      menu.setAttribute("data-fallback-open", "true");
      if (overlay) overlay.hidden = false;
      document.body.style.overflow = "hidden";
      document.querySelector(".site-header")?.setAttribute("data-nav-state", "opaque");
      menu
        .querySelector("a[href], button, input, textarea, select, details, [tabindex]:not([tabindex='-1'])")
        ?.focus();
    };

    const closeMenu = () => {
      const button = document.querySelector('[aria-controls="mobile-menu"]');
      const menu = document.querySelector("#mobile-menu");
      const overlay = document.querySelector("[data-mobile-menu-overlay]");
      if (!button || !menu) return;

      button.setAttribute("aria-expanded", "false");
      menu.hidden = true;
      menu.removeAttribute("data-fallback-open");
      if (overlay) overlay.hidden = true;
      document.body.style.overflow = "";
      document.querySelector(".site-header")?.setAttribute("data-nav-state", "transparent");
      button.focus();
    };

    document.addEventListener("click", (event) => {
      if (root.dataset.shellReact === "ready") return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const toggle = target.closest('[aria-controls="mobile-menu"]');
      const overlay = target.closest("[data-mobile-menu-overlay]");
      const menuLink = target.closest("#mobile-menu a[href]");

      if (toggle) {
        event.preventDefault();
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        if (expanded) closeMenu();
        else openMenu();
        return;
      }

      if (overlay || menuLink) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (root.dataset.shellReact === "ready") return;
      if (event.key === "Escape") closeMenu();
    });
  }

  function startCopyFallback() {
    const resetTimers = new WeakMap();

    function fallbackCopy(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    function setButtonState(button, copied) {
      const label = button.getAttribute("data-copy-label") || "Copy";
      const compactLabel = button.getAttribute("data-copy-compact-label") || label;
      button.setAttribute("data-copied", copied ? "true" : "false");
      button.setAttribute("aria-label", copied ? "Copied" : label);

      const currentLabels = button.querySelectorAll(".copy-button-label-current");
      currentLabels.forEach((currentLabel, index) => {
        currentLabel.textContent = copied
          ? "Copied"
          : index === 0
            ? label
            : compactLabel;
      });
    }

    async function copyFromButton(button) {
      const text = button.getAttribute("data-copy-text") || "";
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        fallbackCopy(text);
      }

      setButtonState(button, true);
      const previousTimer = resetTimers.get(button);
      if (previousTimer) window.clearTimeout(previousTimer);
      resetTimers.set(
        button,
        window.setTimeout(() => setButtonState(button, false), 1600),
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

  startBackgroundMotion();
  startMenuFallback();
  startCopyFallback();
})();
