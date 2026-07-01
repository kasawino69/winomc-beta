/* WinoMC Webconsole 2.0.0.12b core/state */
(function () {
  'use strict';
  const listeners = new Map();
  const state = { mode: 'pc-classic', safe: new URLSearchParams(location.search).has('safe'), status: null };
  function set(key, value) { state[key] = value; (listeners.get(key) || []).forEach(fn => fn(value, state)); window.WinoMC?.emit?.('state', { key, value }); }
  function get(key) { return key ? state[key] : { ...state }; }
  function subscribe(key, fn) { const list = listeners.get(key) || []; list.push(fn); listeners.set(key, list); return () => listeners.set(key, list.filter(item => item !== fn)); }
  window.WinoMC = Object.assign(window.WinoMC || {}, { state: { get, set, subscribe } });
})();
