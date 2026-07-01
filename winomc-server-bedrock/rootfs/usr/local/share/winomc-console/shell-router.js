/* WinoMC shell router 1.6.14.23b
   The router is the only bridge between strict PC and Mobile UI modules.
   Shared application modules stay in the existing console server functions. */
(function WinoMCShellRouter() {
  if (window.WinoMCShellRouter?.initialized) return;

  const Router = { initialized: true };
  let tickScheduled = false;
  let ticking = false;

  function scheduleTick() {
    if (tickScheduled) return;
    tickScheduled = true;
    window.requestAnimationFrame(() => {
      tickScheduled = false;
      Router.tick();
    });
  }

  Router.isPc = function isPc() {
    return Boolean(window.WinoMCPCUI?.isActive?.());
  };

  Router.tick = function tick() {
    if (ticking) return;
    ticking = true;
    try {
      if (Router.isPc()) {
        window.WinoMCPCUI?.tick?.();
      } else {
        window.WinoMCMobileUI?.tick?.();
      }
    } finally {
      ticking = false;
    }
  };

  const originalOpenEditorOverlay = window.openEditorOverlay;
  const originalCloseEditorOverlay = window.closeEditorOverlay;
  const originalToggleEditorFullscreen = window.toggleEditorFullscreen;
  const originalActivateTab = window.activateTab;
  const originalOpenDesktopWindow = window.openDesktopWindow;

  if (typeof originalOpenEditorOverlay === 'function') window.openEditorOverlay = function routedOpenEditorOverlay() {
    if (Router.isPc()) return window.WinoMCPCUI.openEditor({ fullscreen: false });
    window.WinoMCPCUI?.restoreEditorHome?.();
    return originalOpenEditorOverlay.apply(this, arguments);
  };

  if (typeof originalCloseEditorOverlay === 'function') window.closeEditorOverlay = function routedCloseEditorOverlay() {
    if (Router.isPc()) return window.WinoMCPCUI.closeEditor();
    return originalCloseEditorOverlay.apply(this, arguments);
  };

  if (typeof originalToggleEditorFullscreen === 'function') window.toggleEditorFullscreen = function routedToggleEditorFullscreen(event) {
    if (Router.isPc()) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      return window.WinoMCPCUI.toggleFullscreen();
    }
    return originalToggleEditorFullscreen.apply(this, arguments);
  };

  if (typeof originalActivateTab === 'function') window.activateTab = function routedActivateTab(tab) {
    const result = originalActivateTab.apply(this, arguments);
    scheduleTick();
    return result;
  };

  if (typeof originalOpenDesktopWindow === 'function') window.openDesktopWindow = function routedOpenDesktopWindow(id) {
    const result = originalOpenDesktopWindow.apply(this, arguments);
    scheduleTick();
    return result;
  };

  document.addEventListener('click', (event) => {
    if (!Router.isPc()) return;
    if (event.target.closest('#editorFullscreen')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.WinoMCPCUI.toggleFullscreen();
      return;
    }
    if (event.target.closest('#fileCloseEditor')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (typeof clearEditor === 'function') clearEditor();
      else window.WinoMCPCUI.closeEditor();
    }
  }, true);

  document.addEventListener('keydown', (event) => {
    if (!Router.isPc()) return;
    if (event.key === 'Escape' && document.getElementById('editorPanel')?.classList.contains('editor-open')) {
      event.preventDefault();
      if (typeof clearEditor === 'function') clearEditor();
      else window.WinoMCPCUI.closeEditor();
    }
  }, true);

  const observer = new MutationObserver(scheduleTick);
  observer.observe(document.body, { attributes: true, childList: true, subtree: false, attributeFilter: ['class'] });

  window.addEventListener('resize', scheduleTick, { passive: true });
  window.addEventListener('orientationchange', scheduleTick, { passive: true });
  document.addEventListener('click', scheduleTick, true);

  window.WinoMCShellRouter = Router;
  Router.tick();
  window.setTimeout(scheduleTick, 100);
  window.setTimeout(scheduleTick, 350);
})();
