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
    "--background-plane-rotate-x",
    "--background-plane-rotate-y",
    "--background-header-before-rotate-x",
    "--background-header-before-rotate-y",
    "--background-header-after-rotate-x",
    "--background-header-after-rotate-y",
    "--background-hero-edge-rotate-x",
    "--background-hero-edge-rotate-y",
    "--background-hero-motif-rotate-x",
    "--background-hero-motif-rotate-y",
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
    let pointerY = window.innerHeight / 2;
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
      const planeTiltX = normalY * -4.8;
      const planeTiltY = normalX * 5.6;
      const headerTiltX = normalY * -2.8;
      const headerTiltY = normalX * 3.4;

      root.style.setProperty("--background-plane-normal-x", normalX.toFixed(4));
      root.style.setProperty("--background-plane-normal-y", normalY.toFixed(4));
      root.style.setProperty(
        "--background-plane-tilt-x",
        `${planeTiltX.toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-plane-tilt-y",
        `${planeTiltY.toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-header-tilt-x",
        `${headerTiltX.toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-header-tilt-y",
        `${headerTiltY.toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-plane-rotate-x",
        `${planeTiltX.toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-plane-rotate-y",
        `${planeTiltY.toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-header-before-rotate-x",
        `${(headerTiltX * 1.5).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-header-before-rotate-y",
        `${(headerTiltY * 1.62).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-header-after-rotate-x",
        `${(headerTiltX * 1.22).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-header-after-rotate-y",
        `${(headerTiltY * 1.34).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-hero-edge-rotate-x",
        `${(headerTiltX * 1.35).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-hero-edge-rotate-y",
        `${(headerTiltY * 1.48).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-hero-motif-rotate-x",
        `${(headerTiltX * 1.72).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-hero-motif-rotate-y",
        `${(headerTiltY * 1.86).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-plane-origin-x",
        `${(50 + normalX * 6).toFixed(2)}%`,
      );
      root.style.setProperty(
        "--background-plane-origin-y",
        `${(52 + normalY * 4).toFixed(2)}%`,
      );
      root.style.setProperty(
        "--background-header-origin-x",
        `${(50 + normalX * 4.2).toFixed(2)}%`,
      );
      root.style.setProperty(
        "--background-header-origin-y",
        `${(46 + normalY * 2.8).toFixed(2)}%`,
      );
      root.style.setProperty(
        "--background-plane-drift-x",
        "0px",
      );
      root.style.setProperty(
        "--background-plane-drift-y",
        "0px",
      );
      root.style.setProperty(
        "--background-header-drift-x",
        `${(normalX * -7).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-header-drift-y",
        `${(normalY * -4).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-grid-x",
        `${(normalX * -5).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-grid-y",
        `${(normalY * -3).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-grid-minor-x",
        `${(normalX * -5).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-grid-minor-y",
        `${(normalY * -3).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-header-grid-x",
        `${(normalX * -10).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-header-grid-y",
        `${(normalY * -6).toFixed(2)}px`,
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
      root.dataset.backgroundMotion = "active";
      document.addEventListener(pointerMoveEvent, queuePointer, {
        capture: true,
        passive: true,
      });
      updatePointer();
    }

    function stopTracking() {
      if (!tracking) return;
      tracking = false;
      delete root.dataset.backgroundMotion;
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
