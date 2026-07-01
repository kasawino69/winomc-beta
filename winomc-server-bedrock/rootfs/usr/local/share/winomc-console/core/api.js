/* WinoMC Webconsole 2.0.0.12b core/api */
(function () {
  'use strict';
  function endpoint(path, query) {
    const clean = String(path || '').replace(/^\/+/, '');
    const url = new URL(clean, window.location.href.replace(/[^/]*$/, ''));
    Object.entries(query || {}).forEach(([key, value]) => url.searchParams.set(key, value));
    return url.toString();
  }
  async function request(path, options) {
    const timeoutMs = Number(options?.timeout || 10000);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(endpoint(path, options?.query), { cache: 'no-store', ...options, signal: controller.signal });
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      if (!response.ok || data.ok === false) throw new Error(data.error || response.statusText);
      return data;
    } finally {
      clearTimeout(timer);
    }
  }
  window.WinoMC = window.WinoMC || {};
  window.WinoMC.api = { endpoint, request, get: (path, query, timeout) => request(path, { query, timeout }), post: (path, body, timeout) => request(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body || {}), timeout }) };
})();
