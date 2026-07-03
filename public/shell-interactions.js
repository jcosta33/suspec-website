(() => {
  const root = document.documentElement;

  const resetProperties = [
    "--background-plane-tilt-x",
    "--background-plane-tilt-y",
    "--background-plane-origin-x",
    "--background-plane-origin-y",
    "--background-header-tilt-x",
    "--background-header-tilt-y",
    "--background-plane-rotate-x",
    "--background-plane-rotate-y",
    "--background-plane-shift-x",
    "--background-plane-shift-y",
    "--background-plane-drift-x",
    "--background-plane-drift-y",
    "--background-plane-drift-soft-x",
    "--background-plane-drift-soft-y",
    "--background-plane-skew-x",
    "--background-plane-skew-y",
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
    "--background-plane-normal-x",
    "--background-plane-normal-y",
    "--background-header-origin-x",
    "--background-header-origin-y",
  ];

  function startBackgroundMotion() {
    const motionQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let tracking = false;
    const motionEvents =
      "PointerEvent" in window ? ["pointermove", "mousemove"] : ["mousemove"];
    const settleEvents =
      "PointerEvent" in window ? ["pointerleave", "mouseleave"] : ["mouseleave"];

    function resetPointer() {
      for (const property of resetProperties) root.style.removeProperty(property);
      currentX = 0;
      currentY = 0;
      targetX = 0;
      targetY = 0;
    }

    function writePointerMotion(normalX, normalY) {
      const planeTiltX = normalY * -6.2;
      const planeTiltY = normalX * 7.1;
      const headerTiltX = planeTiltX * 0.74;
      const headerTiltY = planeTiltY * 0.74;
      const planeShiftX = -normalX * 3.8;
      const planeShiftY = -normalY * 3;
      const planeDriftX = normalX * 3.2;
      const planeDriftY = normalY * 2.4;
      const headerShiftX = normalX * 7.4;
      const headerShiftY = normalY * 5.4;
      const heroShiftX = normalX * 6.6;
      const heroShiftY = normalY * 4.8;

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
        "--background-plane-shift-x",
        `${planeShiftX.toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-shift-y",
        `${planeShiftY.toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-drift-x",
        `${planeDriftX.toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-drift-y",
        `${planeDriftY.toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-drift-soft-x",
        `${(planeDriftX * 0.42).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-drift-soft-y",
        `${(planeDriftY * 0.42).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-skew-x",
        "0deg",
      );
      root.style.setProperty(
        "--background-plane-skew-y",
        "0deg",
      );
      root.style.setProperty(
        "--background-header-before-rotate-x",
        `${headerTiltX.toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-header-before-rotate-y",
        `${headerTiltY.toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-header-after-rotate-x",
        `${(headerTiltX * 0.74).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-header-after-rotate-y",
        `${(headerTiltY * 0.74).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-header-shift-x",
        `${headerShiftX.toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-header-shift-y",
        `${headerShiftY.toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-header-shift-soft-x",
        `${(headerShiftX * 0.54).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-header-shift-soft-y",
        `${(headerShiftY * 0.54).toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-hero-edge-rotate-x",
        `${(headerTiltX * 0.72).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-hero-edge-rotate-y",
        `${(headerTiltY * 0.72).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-hero-motif-rotate-x",
        `${(headerTiltX * 0.9).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-hero-motif-rotate-y",
        `${(headerTiltY * 0.9).toFixed(3)}deg`,
      );
      root.style.setProperty(
        "--background-hero-shift-x",
        `${heroShiftX.toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-hero-shift-y",
        `${heroShiftY.toFixed(2)}px`,
      );
      root.style.setProperty(
        "--background-plane-origin-x",
        `${(50 + normalX * 9).toFixed(2)}%`,
      );
      root.style.setProperty(
        "--background-plane-origin-y",
        `${(54 + normalY * 6.2).toFixed(2)}%`,
      );
      root.style.setProperty(
        "--background-header-origin-x",
        `${(50 + normalX * 6).toFixed(2)}%`,
      );
      root.style.setProperty(
        "--background-header-origin-y",
        `${(46 + normalY * 4.2).toFixed(2)}%`,
      );
    }

    function renderPointerMotion() {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;

      const settled =
        Math.abs(targetX - currentX) < 0.001 &&
        Math.abs(targetY - currentY) < 0.001;

      if (settled) {
        currentX = targetX;
        currentY = targetY;
      }

      writePointerMotion(currentX, currentY);

      if (settled) {
        frame = 0;
      } else {
        frame = window.requestAnimationFrame(renderPointerMotion);
      }
    }

    function queueRender() {
      if (frame === 0) frame = window.requestAnimationFrame(renderPointerMotion);
    }

    function updateTarget(clientX, clientY) {
      const width = Math.max(window.innerWidth, 1);
      const height = Math.max(window.innerHeight, 1);
      targetX = Math.max(-1, Math.min(1, (clientX / width - 0.5) * 2));
      targetY = Math.max(-1, Math.min(1, (clientY / height - 0.5) * 2));
      queueRender();
    }

    function queuePointer(event) {
      if (!tracking) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      updateTarget(pointerX, pointerY);
    }

    function settlePointer() {
      targetX = 0;
      targetY = 0;
      queueRender();
    }

    function startTracking() {
      if (tracking) return;
      tracking = true;
      root.dataset.backgroundMotion = "active";
      motionEvents.forEach((eventName) => {
        document.addEventListener(eventName, queuePointer, {
          capture: true,
          passive: true,
        });
      });
      settleEvents.forEach((eventName) => {
        window.addEventListener(eventName, settlePointer);
      });
      writePointerMotion(0, 0);
    }

    function stopTracking() {
      if (!tracking) return;
      tracking = false;
      delete root.dataset.backgroundMotion;
      motionEvents.forEach((eventName) => {
        document.removeEventListener(eventName, queuePointer, true);
      });
      settleEvents.forEach((eventName) => {
        window.removeEventListener(eventName, settlePointer);
      });
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
      if (tracking) updateTarget(pointerX, pointerY);
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
