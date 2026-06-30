/* WinoMC shell router 1.6.14.22b
   The router is the only bridge between strict PC and Mobile UI modules.
   Shared application modules stay in the existing console server functions. */
(function WinoMCShellRouter() {
  const Router = {};

  Router.isPc = function isPc() {
    return Boolean(window.WinoMCPCUI?.isActive?.());
  };

  Router.tick = function tick() {
    if (Router.isPc()) {
      window.WinoMCPCUI?.tick?.();
    } else {
      window.WinoMCMobileUI?.tick?.();
    }
  };

  const originalOpenEditorOverlay = openEditorOverlay;
  const originalCloseEditorOverlay = closeEditorOverlay;
  const originalToggleEditorFullscreen = toggleEditorFullscreen;
  const originalActivateTab = activateTab;
  const originalOpenDesktopWindow = openDesktopWindow;

  openEditorOverlay = function routedOpenEditorOverlay() {
    if (Router.isPc()) return window.WinoMCPCUI.openEditor({ fullscreen: false });
    window.WinoMCPCUI?.restoreEditorHome?.();
    return originalOpenEditorOverlay.apply(this, arguments);
  };

  closeEditorOverlay = function routedCloseEditorOverlay() {
    if (Router.isPc()) return window.WinoMCPCUI.closeEditor();
    return originalCloseEditorOverlay.apply(this, arguments);
  };

  toggleEditorFullscreen = function routedToggleEditorFullscreen(event) {
    if (Router.isPc()) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      return window.WinoMCPCUI.toggleFullscreen();
    }
    return originalToggleEditorFullscreen.apply(this, arguments);
  };

  activateTab = function routedActivateTab(tab) {
    const result = originalActivateTab.apply(this, arguments);
    window.requestAnimationFrame(Router.tick);
    return result;
  };

  openDesktopWindow = function routedOpenDesktopWindow(id) {
    const result = originalOpenDesktopWindow.apply(this, arguments);
    window.requestAnimationFrame(Router.tick);
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

  const observer = new MutationObserver(() => window.requestAnimationFrame(Router.tick));
  observer.observe(document.body, { attributes: true, childList: true, subtree: false, attributeFilter: ['class'] });

  window.addEventListener('resize', () => window.requestAnimationFrame(Router.tick), { passive: true });
  document.addEventListener('click', () => window.requestAnimationFrame(Router.tick), true);

  window.WinoMCShellRouter = Router;
  Router.tick();
  window.setTimeout(Router.tick, 100);
  window.setTimeout(Router.tick, 350);
})();
