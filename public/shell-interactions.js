(() => {
  const root = document.documentElement;

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

  startMenuFallback();
  startCopyFallback();
})();
