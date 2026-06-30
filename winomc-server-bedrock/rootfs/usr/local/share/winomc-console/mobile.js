/* WinoMC Mobile UI 1.6.14.22b
   Mobile-only behaviour. This file must not touch PC editor/window logic. */
(function WinoMCMobileUI() {
  const Mobile = {};

  function hasFinePointer() {
    try {
      return Boolean(window.matchMedia && window.matchMedia('(pointer: fine)').matches);
    } catch (_) {
      return false;
    }
  }

  Mobile.isActive = function isActive() {
    const fine = hasFinePointer();
    const touchOnly = navigator.maxTouchPoints > 0 && !fine;
    return touchOnly || (!fine && window.innerWidth < 720);
  };

  Mobile.syncShell = function syncShell() {
    const active = Mobile.isActive();
    document.body.classList.toggle('winomc-mobile', active);
    document.body.classList.toggle('winomc-pc', !active);
    return active;
  };

  Mobile.isolateTabs = function isolateTabs() {
    if (!Mobile.syncShell()) return;
    document.body.classList.remove('desktop-mode', 'winomc-pc-editor-open', 'winomc-pc-editor-fullscreen', 'has-maximized-card');
    document.querySelectorAll('.tab-panel').forEach((panel) => {
      panel.classList.remove('desktop-open', 'desktop-minimized', 'desktop-maximized');
    });
    const activePanel = document.querySelector('.tab-panel.active') || document.querySelector('.tab-panel[data-panel="overview"]');
    const active = activePanel?.dataset?.panel || 'overview';
    document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === active));
    document.querySelectorAll('[data-tab]').forEach((button) => button.classList.toggle('active', button.dataset.tab === active));
    window.WinoMCPCUI?.restoreEditorHome?.();
  };

  Mobile.tick = function tick() {
    Mobile.isolateTabs();
  };

  window.WinoMCMobileUI = Mobile;
})();
