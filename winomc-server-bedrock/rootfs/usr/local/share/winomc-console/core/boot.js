/* WinoMC Webconsole 2.0.0.12b core/boot
 * Ground-rebuild foundation: tiny module registry, isolated startup phases,
 * and visible error boundaries for Home Assistant Ingress.
 */
(function () {
  'use strict';
  const VERSION = '2.0.0.12b';
  const started = new Set();
  const modules = new Map();
  const errors = [];

  function emit(type, detail) {
    window.dispatchEvent(new CustomEvent('winomc:' + type, { detail }));
  }

  function visibleError(scope, error) {
    const message = error && (error.message || String(error)) || 'Unbekannter Fehler';
    errors.push({ scope, message, time: new Date().toISOString() });
    document.documentElement.dataset.winomcBoot = 'degraded';
    let host = document.getElementById('winomcArchitectureErrors');
    if (!host) {
      host = document.createElement('aside');
      host.id = 'winomcArchitectureErrors';
      host.className = 'winomc-architecture-errors';
      host.setAttribute('role', 'status');
      document.body.appendChild(host);
    }
    host.textContent = 'WinoMC Modulhinweis: ' + scope + ' – ' + message;
    emit('error', { scope, message });
  }

  function register(name, factory) {
    if (!name || typeof factory !== 'function') return;
    modules.set(name, factory);
  }

  async function start(name, context) {
    if (started.has(name) || !modules.has(name)) return null;
    started.add(name);
    try {
      const result = await modules.get(name)(context || window.WinoMC?.context || {});
      emit('module-ready', { name });
      return result;
    } catch (error) {
      visibleError(name, error);
      return null;
    }
  }

  window.WinoMC = Object.assign(window.WinoMC || {}, {
    version: VERSION,
    modules,
    errors,
    register,
    start,
    emit,
    visibleError,
    context: {
      version: VERSION,
      apiBase: './',
      modes: ['mobile', 'pc-classic', 'desktop'],
      moduleGroups: ['overview', 'live-console', 'dashboard', 'server', 'files', 'packs-addons', 'backups', 'diagnostics', 'players', 'firststart-profiles', 'network', 'updates', 'expert', 'web-protection'],
    },
  });

  document.documentElement.dataset.winomcVersion = VERSION;
  document.documentElement.dataset.winomcArchitecture = 'ground-rebuild';
  emit('boot-ready', window.WinoMC.context);
})();
