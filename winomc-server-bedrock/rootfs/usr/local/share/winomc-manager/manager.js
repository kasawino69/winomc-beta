const VERSION = '2.1.15b';

const state = {
  instances: [],
  profiles: [],
  selectedId: null,
  selected: null,
  tab: 'overview',
  mode: 'pc-classic',
  logLevel: 'info',
  dragId: null,
  order: loadInstanceOrder(),
  autoRefreshTimer: null,
  autoRefreshBusy: false,
  lastAutoRefreshAt: null,
  players: [],
  playerFilter: 'all',
};

const BEDROCK_COMMAND_CATALOG_SOURCE = 'Microsoft Bedrock stable command reference + Bedrock archive compatibility list';
const COMMAND_CATALOG = window.WINOMC_BEDROCK_COMMANDS || [];
const GAMERULE_CATALOG = window.WINOMC_BEDROCK_GAMERULES || [];
const BEDROCK_SETTINGS_SCHEMA = window.WINOMC_BEDROCK_SETTINGS_SCHEMA || [];

const $ = (selector, root = document) => root.querySelector(selector);

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));
}

const esc = escapeHtml;
const apiPath = (path) => './' + path.replace(/^\/+/, '');

function loadInstanceOrder() {
  try {
    return JSON.parse(localStorage.getItem('winomc-instance-order') || '[]');
  } catch {
    return [];
  }
}

function saveInstanceOrder() {
  localStorage.setItem('winomc-instance-order', JSON.stringify(state.order));
}

function sortInstances(instances) {
  const order = state.order || [];
  return [...instances].sort((a, b) => {
    const ai = order.indexOf(a.id);
    const bi = order.indexOf(b.id);
    if (ai !== -1 || bi !== -1) {
      return (ai === -1 ? 9999 : ai) - (bi === -1 ? 9999 : bi);
    }
    return String(a.name || a.id).localeCompare(String(b.name || b.id));
  });
}

async function api(path, options = {}) {
  const res = await fetch(apiPath(path), {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => ({
    ok: false,
    code: `http_${res.status}`,
    message: `HTTP ${res.status}`,
    component: 'manager-api',
  }));

  if (!res.ok || data.ok === false) {
    throw data;
  }

  return data;
}

const get = (path) => api(path);
const post = (path, payload = {}) => api(path, { method: 'POST', body: JSON.stringify(payload) });
const patch = (path, payload = {}) => api(path, { method: 'PATCH', body: JSON.stringify(payload) });
const put = (path, payload = {}) => api(path, { method: 'PUT', body: JSON.stringify(payload) });

function unwrapInstance(data) {
  return data?.instance || data;
}

function showError(error) {
  const panel = $('#errorPanel');
  const message = error?.message || error?.error || String(error);
  const component = error?.component || 'api';
  const instanceId = error?.instance_id || state.selectedId || '-';
  const suggested = error?.suggested_action;

  panel.hidden = false;
  panel.innerHTML = `
    <article class="error-card">
      <p class="eyebrow">Fehler</p>
      <h2>${esc(message)}</h2>
      <button type="button" id="closeError">Schließen</button>
      <p class="hint">Komponente: ${esc(component)} · Instanz: ${esc(instanceId)}</p>
      ${suggested ? `<p class="suggested-action">${esc(suggested)}</p>` : ''}
      <details>
        <summary>Technische Details</summary>
        <pre>${esc(JSON.stringify(error, null, 2))}</pre>
      </details>
    </article>
  `;

  $('#closeError').onclick = () => {
    panel.hidden = true;
  };
}

function setAutoMode() {
  const mobile = window.matchMedia('(max-width: 760px), (pointer: coarse)').matches;
  state.mode = mobile ? 'mobile' : 'pc-classic';

  document.body.classList.remove('mode-pc-classic', 'mode-mobile', 'mode-desktop');
  document.body.classList.add(`mode-${state.mode}`);
  document.body.dataset.mode = state.mode;
}

window.matchMedia('(max-width: 760px), (pointer: coarse)').addEventListener('change', setAutoMode);

async function loadInstances(selectId = state.selectedId) {
  const data = await get('/api/instances');

  state.instances = sortInstances(data.instances || []);
  state.profiles = data.profiles || [];
  state.logLevel = String(data.manager?.log_level || data.log_level || state.logLevel || 'info').toLowerCase();

  renderProfiles();
  renderDashboard();
  updateDiagnosticsVisibility();

  if (selectId && state.instances.some((i) => i.id === selectId)) {
    await selectInstance(selectId);
  } else if (!state.selectedId && state.instances[0]) {
    await selectInstance(state.instances[0].id);
  }
}

function profileKey(profile) {
  return String(profile?.id || profile?.key || profile?.name || 'vanilla-survival')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'vanilla-survival';
}

function renderProfiles() {
  const select = $('#profileSelect');
  const profiles = state.profiles.length
    ? state.profiles
    : [{ id: 'vanilla-survival', name: 'Vanilla Survival' }];

  select.innerHTML = profiles
    .map((profile) => {
      const id = profileKey(profile);
      const label = profile.name || profile.id || profile.key || id;
      return `<option value="${esc(id)}">${esc(label)}</option>`;
    })
    .join('');
}

function instanceStatus(instance) {
  return instance?.status?.state || (instance?.broken ? 'broken' : 'stopped');
}

function healthView(instance) {
  const status = instanceStatus(instance);
  const health = instance.health || {};

  if (['crashed', 'broken', 'unknown'].includes(status)) {
    return { ok: false, label: status === 'crashed' ? 'Crashed' : 'Problem' };
  }

  if (health.ok === false) {
    return { ok: false, label: 'Problem' };
  }

  return { ok: true, label: 'OK' };
}

function automationView(instance) {
  const a = instance.automation || {};
  const labels = [];
  if (a.autostart) labels.push('Autostart');
  if (a.watchdog) labels.push('Watchdog');
  return labels.length ? labels.join(' · ') : 'Manuell';
}

function renderInstanceCard(instance) {
  const b = instance.bedrock || {};
  const status = instanceStatus(instance);
  const health = healthView(instance);
  const error = instance.error || (instance.health?.errors || []).join(' · ');

  return `
    <article class="instance-card status-${esc(status)} ${health.ok ? 'health-ok' : 'health-bad'}"
             data-instance-card="${esc(instance.id)}"
             draggable="true"
             tabindex="0"
             role="button"
             aria-label="Instanz ${esc(instance.name || instance.id)} auswählen">
      <p class="eyebrow" data-refresh="id">${esc(instance.id)}</p>
      <h3 data-refresh="name">${esc(instance.name || instance.id)}</h3>
      <span class="status-pill" data-refresh="status">${esc(status)}</span>

      <dl class="facts">
        <div><dt>Profil</dt><dd data-refresh="profile">${esc(instance.profile || '-')}</dd></div>
        <div><dt>IPv4</dt><dd data-refresh="server_port">${esc(b.server_port || '-')}</dd></div>
        <div><dt>IPv6</dt><dd data-refresh="server_port_v6">${esc(b.server_port_v6 || '-')}</dd></div>
        <div><dt>Start</dt><dd data-refresh="started_at">${esc(instance.status?.started_at || '-')}</dd></div>
        <div><dt>Health</dt><dd data-refresh="health">${esc(health.label)}</dd></div>
        <div><dt>Automation</dt><dd data-refresh="automation">${esc(automationView(instance))}</dd></div>
      </dl>

      <p class="warn-box" data-refresh="warning" ${health.ok ? 'hidden' : ''}>${esc(error || `Runtime-Status: ${status}`)}</p>

      <div class="card-actions">
        <button type="button" data-action="start" data-id="${esc(instance.id)}">Start</button>
        <button type="button" data-action="stop" data-id="${esc(instance.id)}">Stop</button>
        <button type="button" data-action="restart" data-id="${esc(instance.id)}">Restart</button>
      </div>
    </article>
  `;
}

function patchText(root, selector, value) {
  const node = root?.querySelector?.(selector);
  if (!node) return;
  const next = String(value ?? '-');
  if (node.textContent !== next) {
    node.textContent = next;
  }
}

function patchInstanceCard(card, instance) {
  if (!card || !instance) return;

  const b = instance.bedrock || {};
  const status = instanceStatus(instance);
  const health = healthView(instance);
  const error = instance.error || (instance.health?.errors || []).join(' · ');

  card.className = `instance-card status-${status} ${health.ok ? 'health-ok' : 'health-bad'}`;
  card.setAttribute('aria-label', `Instanz ${instance.name || instance.id} auswählen`);

  patchText(card, '[data-refresh="id"]', instance.id);
  patchText(card, '[data-refresh="name"]', instance.name || instance.id);
  patchText(card, '[data-refresh="status"]', status);
  patchText(card, '[data-refresh="profile"]', instance.profile || '-');
  patchText(card, '[data-refresh="server_port"]', b.server_port || '-');
  patchText(card, '[data-refresh="server_port_v6"]', b.server_port_v6 || '-');
  patchText(card, '[data-refresh="started_at"]', instance.status?.started_at || '-');
  patchText(card, '[data-refresh="health"]', health.label);
  patchText(card, '[data-refresh="automation"]', automationView(instance));

  const warning = card.querySelector('[data-refresh="warning"]');
  if (warning) {
    warning.hidden = Boolean(health.ok);
    warning.textContent = health.ok ? '' : (error || `Runtime-Status: ${status}`);
  }
}

function patchManagerSummary() {
  const summary = $('#managerSummary');
  if (summary) {
    summary.textContent = `${state.instances.length} Instanz(en) · WinoMC Manager ${VERSION} · Auto-Refresh 10 s · objektbasiert`;
  }
  removeManualDashboardRefreshButtons();
}

function renderDashboard() {
  patchManagerSummary();

  const grid = $('#instancesGrid');
  if (!grid) return;

  grid.innerHTML = state.instances.map((instance) => renderInstanceCard(instance)).join('') ||
    '<p class="empty-state">Noch keine Instanzen. Öffne rechts „Neue Instanz“.</p>';
}

async function selectInstance(id) {
  state.selectedId = id;
  state.selected = unwrapInstance(await get(`/api/instances/${encodeURIComponent(id)}`));

  $('#detailTitle').textContent = `${state.selected.name || id} (${id})`;

  renderDetailActions();
  updateDiagnosticsVisibility();
  await renderDetail();
  renderDashboard();
}

function renderDetailActions() {
  const id = esc(state.selectedId);

  $('#detailActions').innerHTML = `
    <button type="button" data-action="start" data-id="${id}">Start</button>
    <button type="button" data-action="stop" data-id="${id}">Stop</button>
    <button type="button" data-action="restart" data-id="${id}">Restart</button>
    <button type="button" data-action="backup" data-id="${id}">Backup</button>
  `;
}

function updateDiagnosticsVisibility() {
  const visible = state.logLevel === 'debug';
  const tab = $('[data-tab="diagnostics"]');

  if (tab) {
    tab.hidden = !visible;
  }

  if (!visible && state.tab === 'diagnostics') {
    state.tab = 'overview';
    document.querySelectorAll('[data-tab]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === 'overview');
    });
  }
}

function commandAliases(entry) {
  return [entry.command, ...(entry.aliases || [])];
}

function currentCommandName(value) {
  return value.trim().replace(/^\//, '').split(/\s+/)[0]?.toLowerCase() || '';
}

function isTokenLike(value) {
  return value.trim().length > 0;
}

function enumSuggestionsForInput(value, entry) {
  const clean = value.replace(/^\//, '');
  const parts = clean.split(/\s+/);
  const last = parts[parts.length - 1]?.toLowerCase() || '';
  const suggestions = [];

  for (const arg of entry?.args || []) {
    for (const item of ENUM_SUGGESTIONS[arg] || []) {
      if (!last || item.toLowerCase().startsWith(last) || item.toLowerCase().includes(last)) {
        suggestions.push({
          type: 'enum',
          command: item,
          insert: clean.endsWith(' ') ? `${clean}${item}` : `${parts.slice(0, -1).join(' ')}${parts.length > 1 ? ' ' : ''}${item}`,
          description: `${arg}-Vorschlag`,
          syntax: [item],
        });
      }
    }
  }

  return suggestions.slice(0, 8);
}

function autocompleteSuggestions(value) {
  if (window.WinoMCAutocomplete) {
    return window.WinoMCAutocomplete.buildSuggestions(value, COMMAND_CATALOG, GAMERULE_CATALOG);
  }
  return [];
}

function renderAutocomplete(input) {
  const box = $('#commandAutocomplete');
  if (!box) return;

  const suggestions = autocompleteSuggestions(input.value);

  if (!suggestions.length) {
    box.hidden = true;
    box.classList.remove('open-up');
    box.innerHTML = '';
    return;
  }

  box.hidden = false;
  box.classList.add('open-up');
  box.innerHTML = suggestions.map((entry, index) => `
    <button type="button"
            class="autocomplete-item ${index === 0 ? 'active' : ''}"
            data-autocomplete-insert="${esc(entry.insert || entry.command)}">
      <span class="autocomplete-command">${esc(entry.command)}</span>
      <span class="autocomplete-description">${esc(entry.description || '')}</span>
      <code>${esc((entry.syntax || [entry.insert || entry.command])[0])}</code>
    </button>
  `).join('');

  box.querySelector('.autocomplete-item.active')?.scrollIntoView({ block: 'nearest' });
}

function applyAutocomplete(value) {
  const input = $('#commandForm input[name="command"]');
  if (!input) return;
  input.value = String(value || '').replace(/^\//, '');
  input.focus();
  renderAutocomplete(input);
}


function settingInput(field, value) {
  const current = value ?? field.default ?? '';
  const advancedClass = field.advanced ? ' advanced-setting' : '';
  const description = field.description ? `<small class="setting-help">${esc(field.description)}</small>` : '';
  const property = field.property ? `<small class="server-property-name">server.properties: ${esc(field.property)}</small>` : `<small class="server-property-name">WinoMC-Instanzwert</small>`;
  const help = `${property}${description}`;

  if (field.type === 'boolean') {
    const checked = current === true || String(current).toLowerCase() === 'true';
    return `<label class="checkbox-row setting-field${advancedClass}">
      <input name="${esc(field.key)}" type="checkbox" ${checked ? 'checked' : ''}>
      <span><strong>${esc(field.label)}</strong>${help}</span>
    </label>`;
  }

  if (field.type === 'select') {
    return `<label class="setting-field${advancedClass}">
      <span>${esc(field.label)}</span>
      <select name="${esc(field.key)}">
        ${(field.options || []).map((opt) => `<option value="${esc(opt)}" ${String(current) === String(opt) ? 'selected' : ''}>${esc(opt)}</option>`).join('')}
      </select>
      ${help}
    </label>`;
  }

  const type = field.type === 'number' ? 'number' : 'text';
  const step = field.step !== undefined ? ` step="${esc(field.step)}"` : '';
  const min = field.min !== undefined ? ` min="${esc(field.min)}"` : '';
  const max = field.max !== undefined ? ` max="${esc(field.max)}"` : '';

  return `<label class="setting-field${advancedClass}">
    <span>${esc(field.label)}</span>
    <input name="${esc(field.key)}" type="${type}" value="${esc(current)}"${step}${min}${max}>
    ${help}
  </label>`;
}

function settingGroupDescription(group) {
  const descriptions = {
    'Bedrock Runtime': 'BDS-Version und WinoMC-Runtime-Werte dieser Instanz.',
    'Allgemein / Realm-nah': 'Die Werte, die man typischerweise aus Realm-/Welt-Einstellungen kennt.',
    'Zugang & Sicherheit': 'Xbox-Auth, Allowlist, Rechte, Chat und Skin-/Interaktionsschutz.',
    'Netzwerk': 'Ports, LAN-Sichtbarkeit und Paketkompression.',
    'Performance': 'Sichtweite, Tick-Distanz, Threads und Chunk-/Build-Verhalten.',
    'Packs & Logging': 'Texturepacks, Content-Logs, Telemetrie und visuelle Client-Optionen.',
    'Server Authoritative / Movement': 'Bewegungs-, Block- und Interaktionsvalidierung des Servers.',
    'Script / Debug': 'Script-Debugging und Debugger-Verbindungen.',
    'Script Watchdog': 'Script-Watchdog-Grenzwerte gegen Hänger, Spikes und Speicherprobleme.',
    'Diagnostics': 'BDS-Diagnoseaufzeichnungen und Limits.',
  };

  return descriptions[group] || 'Weitere Bedrock-Serveroptionen.';
}

function renderSettingsForm(inst) {
  const bedrock = inst.bedrock || {};
  const automation = inst.automation || {};
  const groups = new Map();

  for (const field of BEDROCK_SETTINGS_SCHEMA) {
    const list = groups.get(field.group) || [];
    list.push(field);
    groups.set(field.group, list);
  }

  const sections = [...groups.entries()].map(([group, fields]) => `
    <section class="settings-group">
      <div class="settings-group-heading">
        <div>
          <h3>${esc(group)}</h3>
          <p class="settings-group-description">${esc(settingGroupDescription(group))}</p>
        </div>
        <span class="settings-count">${fields.length} Optionen</span>
      </div>
      <div class="form-grid compact server-settings-grid">
        ${fields.map((field) => settingInput(field, bedrock[field.key])).join('')}
      </div>
    </section>
  `).join('');

  return `
    <form id="settingsForm" class="settings-form">
      <section class="settings-intro">
        <p class="eyebrow">Vollständige Server-Einstellungen</p>
        <h3>Bedrock server.properties + WinoMC-Instanzwerte</h3>
        <p>Diese Ansicht enthält alle geplanten Serverwerte aus dem Manager-Schema. Werte mit server.properties-Hinweis werden direkt in die Instanzdatei geschrieben; WinoMC-Instanzwerte steuern die Runtime.</p>
      </section>

      ${sections}

      <section class="settings-group">
        <div class="settings-group-heading">
          <div>
            <h3>Automation</h3>
            <p class="settings-group-description">WinoMC-Manager-Automation für diese Instanz.</p>
          </div>
          <span class="settings-count">2 Optionen</span>
        </div>
        <div class="form-grid compact">
          <label class="checkbox-row setting-field"><input name="autostart" type="checkbox" ${automation.autostart ? 'checked' : ''}><span><strong>Autostart beim Add-on-Start</strong><small class="server-property-name">WinoMC-Automation</small></span></label>
          <label class="checkbox-row setting-field"><input name="watchdog" type="checkbox" ${automation.watchdog ? 'checked' : ''}><span><strong>Watchdog: bei Crash automatisch neu starten</strong><small class="server-property-name">WinoMC-Automation</small></span></label>
        </div>
      </section>

      <button type="submit" class="primary">Einstellungen speichern</button>
    </form>
    <p class="hint">Änderungen an server.properties werden beim Speichern in die Instanz geschrieben. Viele Werte benötigen einen Instanz-Neustart.</p>
  `;
}

function collectBedrockSettings(form) {
  const data = new FormData(form);
  const bedrock = {};

  for (const field of BEDROCK_SETTINGS_SCHEMA) {
    if (field.type === 'boolean') {
      bedrock[field.key] = Boolean(data.get(field.key));
    } else if (field.type === 'number') {
      const raw = data.get(field.key);
      bedrock[field.key] = raw === '' || raw === null ? field.default : Number(raw);
    } else {
      bedrock[field.key] = data.get(field.key) ?? '';
    }
  }

  return bedrock;
}

function roleLabel(role) {
  return ({ operator: 'Operator', member: 'Member', visitor: 'Visitor' }[role] || role || 'Member');
}

function playerMatchesFilter(player) {
  const f = state.playerFilter || 'all';
  if (f === 'all') return true;
  if (f === 'allowlisted') return Boolean(player.allowlisted);
  if (f === 'not-allowlisted') return !player.allowlisted;
  return player.role === f;
}

function renderPlayersModule(players, warnings = []) {
  const counts = players.reduce((acc, p) => {
    acc[p.role] = (acc[p.role] || 0) + 1;
    acc.allowlisted += p.allowlisted ? 1 : 0;
    acc.notAllowlisted += p.allowlisted ? 0 : 1;
    return acc;
  }, { operator: 0, member: 0, visitor: 0, allowlisted: 0, notAllowlisted: 0 });
  const filtered = players.filter(playerMatchesFilter);
  const filters = [
    ['all', `Alle (${players.length})`],
    ['operator', `OPs (${counts.operator})`],
    ['member', `Members (${counts.member})`],
    ['visitor', `Visitors (${counts.visitor})`],
    ['allowlisted', `Allowlisted (${counts.allowlisted})`],
    ['not-allowlisted', `Nicht allowlisted (${counts.notAllowlisted})`],
  ];
  return `
    <section class="players-module" id="playersModule">
      <div class="info">
        <strong>Spieler & Rechte:</strong> allowlist.json steuert, wer auf den Server darf. permissions.json steuert Rechte wie Operator, Member oder Visitor. Änderungen benötigen je nach Bedrock-Verhalten ggf. Server-Neustart oder Reload.
      </div>
      ${warnings.length ? `<div class="info warning-box">${warnings.map(esc).join('<br>')}</div>` : ''}
      <div class="actions player-filters">
        ${filters.map(([key, label]) => `<button type="button" class="${state.playerFilter === key ? 'primary' : 'soft'}" data-player-filter="${esc(key)}">${esc(label)}</button>`).join('')}
      </div>
      <form id="playersForm" class="settings-form">
        <div class="file-table-wrap">
          <table class="file-table players-table">
            <thead><tr><th>Name</th><th>XUID</th><th>Rolle</th><th>Allowlist</th><th>Limit ignorieren</th><th>Aktionen</th></tr></thead>
            <tbody id="playersTableBody">
              ${filtered.map((p, index) => {
                const realIndex = players.indexOf(p);
                return `<tr data-player-row="${realIndex}">
                  <td><input data-player-field="name" data-player-index="${realIndex}" value="${esc(p.name)}" required></td>
                  <td><input data-player-field="xuid" data-player-index="${realIndex}" value="${esc(p.xuid)}" inputmode="numeric" pattern="[0-9]+" required></td>
                  <td><select data-player-field="role" data-player-index="${realIndex}">
                    ${['operator','member','visitor'].map((role) => `<option value="${role}" ${p.role === role ? 'selected' : ''}>${roleLabel(role)}</option>`).join('')}
                  </select></td>
                  <td><input type="checkbox" data-player-field="allowlisted" data-player-index="${realIndex}" ${p.allowlisted ? 'checked' : ''}></td>
                  <td><input type="checkbox" data-player-field="ignores_player_limit" data-player-index="${realIndex}" ${p.ignores_player_limit ? 'checked' : ''}></td>
                  <td><button type="button" class="danger" data-player-remove="${realIndex}">Entfernen</button></td>
                </tr>`;
              }).join('') || '<tr><td colspan="6">Keine Spieler in diesem Filter.</td></tr>'}
            </tbody>
          </table>
        </div>
        <div class="actions">
          <button type="button" id="addPlayer">Spieler hinzufügen</button>
          <button type="button" id="importPlayers">Aus Dateien laden</button>
          <button type="submit" class="primary">Speichern</button>
          <span id="playersStatus" class="hint"></span>
        </div>
      </form>
    </section>
  `;
}

function collectPlayersForm() {
  document.querySelectorAll('[data-player-field]').forEach((el) => {
    const index = Number(el.dataset.playerIndex);
    const field = el.dataset.playerField;
    if (!state.players[index]) return;
    state.players[index][field] = el.type === 'checkbox' ? el.checked : el.value.trim();
  });
  return state.players;
}

function bindPlayersModule(inst) {
  $('#playersModule')?.addEventListener('click', async (ev) => {
    const filter = ev.target.closest('[data-player-filter]');
    if (filter) { collectPlayersForm(); state.playerFilter = filter.dataset.playerFilter; $('#detailContent').innerHTML = renderPlayersModule(state.players); bindPlayersModule(inst); return; }
    const remove = ev.target.closest('[data-player-remove]');
    if (remove) { collectPlayersForm(); state.players.splice(Number(remove.dataset.playerRemove), 1); $('#detailContent').innerHTML = renderPlayersModule(state.players); bindPlayersModule(inst); return; }
    if (ev.target.closest('#addPlayer')) { collectPlayersForm(); state.players.push({ name: '', xuid: '', role: 'member', allowlisted: true, ignores_player_limit: false }); state.playerFilter = 'all'; $('#detailContent').innerHTML = renderPlayersModule(state.players); bindPlayersModule(inst); return; }
    if (ev.target.closest('#importPlayers')) {
      try { const data = await post(`/api/instances/${encodeURIComponent(inst.id)}/players/import`, {}); state.players = data.players || []; $('#detailContent').innerHTML = renderPlayersModule(state.players, data.warnings || []); bindPlayersModule(inst); }
      catch (err) { showError(err); }
    }
  });
  $('#playersForm').onsubmit = async (ev) => {
    ev.preventDefault();
    try {
      const data = await put(`/api/instances/${encodeURIComponent(inst.id)}/players`, { players: collectPlayersForm() });
      state.players = data.players || [];
      $('#detailContent').innerHTML = renderPlayersModule(state.players, data.warnings || []);
      bindPlayersModule(inst);
    } catch (err) { showError(err); }
  };
}

function renderOverviewFacts(inst) {
  const b = inst.bedrock || {};
  const a = inst.automation || {};
  const health = healthView(inst);

  return `
    <dl class="facts large" data-refresh-scope="selected-overview">
      <div><dt>Status</dt><dd data-overview-refresh="status">${esc(inst.status?.state || '-')}</dd></div>
      <div><dt>Health</dt><dd data-overview-refresh="health">${esc(health.label)}</dd></div>
      <div><dt>Profil</dt><dd data-overview-refresh="profile">${esc(inst.profile || '-')}</dd></div>
      <div><dt>IPv4</dt><dd data-overview-refresh="server_port">${esc(b.server_port || '-')}</dd></div>
      <div><dt>IPv6</dt><dd data-overview-refresh="server_port_v6">${esc(b.server_port_v6 || '-')}</dd></div>
      <div><dt>Welt</dt><dd data-overview-refresh="level_name">${esc(b.level_name || '-')}</dd></div>
      <div><dt>Spielmodus</dt><dd data-overview-refresh="gamemode">${esc(b.gamemode || '-')}</dd></div>
      <div><dt>Autostart</dt><dd data-overview-refresh="autostart">${a.autostart ? 'Aktiv' : 'Aus'}</dd></div>
      <div><dt>Watchdog</dt><dd data-overview-refresh="watchdog">${a.watchdog ? 'Aktiv' : 'Aus'}</dd></div>
    </dl>
  `;
}

function patchSelectedOverviewFacts(inst) {
  const scope = $('[data-refresh-scope="selected-overview"]');
  if (!scope || !inst) return;

  const b = inst.bedrock || {};
  const a = inst.automation || {};
  const health = healthView(inst);

  patchText(scope, '[data-overview-refresh="status"]', inst.status?.state || '-');
  patchText(scope, '[data-overview-refresh="health"]', health.label);
  patchText(scope, '[data-overview-refresh="profile"]', inst.profile || '-');
  patchText(scope, '[data-overview-refresh="server_port"]', b.server_port || '-');
  patchText(scope, '[data-overview-refresh="server_port_v6"]', b.server_port_v6 || '-');
  patchText(scope, '[data-overview-refresh="level_name"]', b.level_name || '-');
  patchText(scope, '[data-overview-refresh="gamemode"]', b.gamemode || '-');
  patchText(scope, '[data-overview-refresh="autostart"]', a.autostart ? 'Aktiv' : 'Aus');
  patchText(scope, '[data-overview-refresh="watchdog"]', a.watchdog ? 'Aktiv' : 'Aus');
}


async function renderDetail() {
  if (!state.selected) return;

  const target = $('#detailContent');
  const inst = state.selected;
  const b = inst.bedrock || {};
  const a = inst.automation || {};
  const health = healthView(inst);

  updateDiagnosticsVisibility();

  if (state.tab === 'overview') {
    target.innerHTML = renderOverviewFacts(inst);
  } else if (state.tab === 'console') {
    const consoleData = await get(`/api/instances/${encodeURIComponent(inst.id)}/console`);
    const lines = consoleData.lines || consoleData.console || consoleData.logs || [];

    target.innerHTML = `
      <pre id="consoleLog" class="console-log">${esc(Array.isArray(lines) ? lines.join('\n') : String(lines || 'Noch keine Logzeilen für diese Instanz.'))}</pre>

      <form id="commandForm" class="command-form autocomplete-form">
        <div class="autocomplete-wrap">
          <input name="command" autocomplete="off" placeholder="Befehl tippen, z. B. gamerule keepinventory true">
          <div id="commandAutocomplete" class="autocomplete-box" hidden></div>
        </div>
        <button type="submit" class="primary">Senden</button>
      </form>

      <p class="hint">Autocomplete basiert auf dem lokalen Bedrock-Befehlskatalog. Commands werden ausschließlich an ${esc(inst.id)} gesendet.</p>
    `;

    const log = $('#consoleLog');
    log.scrollTop = log.scrollHeight;

    const input = $('#commandForm input[name="command"]');
    input.addEventListener('input', () => renderAutocomplete(input));
    input.addEventListener('focus', () => renderAutocomplete(input));
    input.addEventListener('keydown', (ev) => {
      const items = [...document.querySelectorAll('.autocomplete-item')];
      if (!items.length || $('#commandAutocomplete').hidden) return;

      const current = items.findIndex((item) => item.classList.contains('active'));
      if (ev.key === 'ArrowDown') {
        ev.preventDefault();
        items[current]?.classList.remove('active');
        items[(current + 1) % items.length].classList.add('active');
      } else if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        items[current]?.classList.remove('active');
        items[(current - 1 + items.length) % items.length].classList.add('active');
      } else if (ev.key === 'Tab') {
        ev.preventDefault();
        applyAutocomplete(items[Math.max(0, current)]?.dataset.autocompleteInsert || items[0].dataset.autocompleteInsert);
      }
    });

    $('#commandForm').onsubmit = async (ev) => {
      ev.preventDefault();

      const formEl = ev.currentTarget;
      const inputEl = formEl.elements.command;
      const sendButton = formEl.querySelector('button[type="submit"]');
      const command = inputEl.value.trim().replace(/^\//, '');

      if (!command) return;

      try {
        if (sendButton) {
          sendButton.disabled = true;
          sendButton.textContent = 'Sende…';
        }

        await post(`/api/instances/${encodeURIComponent(inst.id)}/command`, { command });

        inputEl.value = '';
        const autocomplete = $('#commandAutocomplete');
        if (autocomplete) {
          autocomplete.hidden = true;
          autocomplete.innerHTML = '';
        }

        const log = $('#consoleLog');
        if (log) {
          log.textContent = `${log.textContent || ''}
> ${command}`;
          log.scrollTop = log.scrollHeight;
        }

        await renderDetail();
      } catch (err) {
        showError(err);
      } finally {
        const nextButton = $('#commandForm button[type="submit"]');
        if (nextButton) {
          nextButton.disabled = false;
          nextButton.textContent = 'Senden';
        }
      }
    };
  } else if (state.tab === 'settings') {
    target.innerHTML = renderSettingsForm(inst);

    $('#settingsForm').onsubmit = async (ev) => {
      ev.preventDefault();
      const formEl = ev.currentTarget;
      const form = new FormData(formEl);

      try {
        await patch(`/api/instances/${encodeURIComponent(inst.id)}`, {
          name: collectBedrockSettings(formEl).server_name || inst.name,
          bedrock: collectBedrockSettings(formEl),
          automation: {
            autostart: Boolean(form.get('autostart')),
            watchdog: Boolean(form.get('watchdog')),
          },
        });

        await loadInstances(inst.id);
      } catch (err) {
        showError(err);
      }
    };
  } else if (state.tab === 'players') {
    const data = await get(`/api/instances/${encodeURIComponent(inst.id)}/players`);
    state.players = data.players || [];
    target.innerHTML = renderPlayersModule(state.players, data.warnings || []);
    bindPlayersModule(inst);
  } else if (state.tab === 'files') {
    const files = await get(`/api/instances/${encodeURIComponent(inst.id)}/files`);

    target.innerHTML = `
      <p class="hint">Instanzbezogene Dateiwurzeln. Der vollständige Dateiexplorer folgt in einem eigenen Schritt.</p>
      <pre>${esc(JSON.stringify(files.roots || files, null, 2))}</pre>
    `;
  } else if (state.tab === 'packs') {
    const packs = await get(`/api/instances/${encodeURIComponent(inst.id)}/packs`);

    target.innerHTML = `
      <h3>Resource Packs</h3>
      <p>${esc((packs.resource_packs || []).join(', ') || 'Keine Nutzerpacks')}</p>
      <h3>Behavior Packs</h3>
      <p>${esc((packs.behavior_packs || []).join(', ') || 'Keine Nutzerpacks')}</p>
    `;
  } else if (state.tab === 'backups') {
    target.innerHTML = `
      <div class="backup-panel">
        <h3>Backups</h3>
        <p class="hint">Erstelle ein manuelles Backup dieser Instanz.</p>
        <button type="button" class="primary" data-action="backup" data-id="${esc(inst.id)}">Backup jetzt erstellen</button>
      </div>
    `;
  } else if (state.tab === 'diagnostics' && state.logLevel === 'debug') {
    target.innerHTML = `<pre>${esc(JSON.stringify(inst.status || inst, null, 2))}</pre>`;
  } else {
    state.tab = 'overview';
    target.innerHTML = '<p class="empty-state">Diagnose ist nur bei WINOMC_LOG_LEVEL=debug sichtbar.</p>';
  }
}

async function runAction(action, id) {
  try {
    if (action === 'details') {
      return selectInstance(id);
    }

    if (action === 'backup') {
      await post(`/api/instances/${encodeURIComponent(id)}/backup`, { type: 'manual-ui' });
    } else {
      await post(`/api/instances/${encodeURIComponent(id)}/${action}`);
    }

    await loadInstances(id);
  } catch (err) {
    showError(err);
  }
}

function toggleCreatePanel(forceOpen) {
  const panel = $('#createPanel');
  const button = $('#createDrawerToggle');
  const open = typeof forceOpen === 'boolean' ? forceOpen : !panel.classList.contains('open');

  panel.classList.toggle('open', open);
  panel.classList.toggle('collapsed', !open);
  button.setAttribute('aria-expanded', String(open));
}


function removeManualDashboardRefreshButtons() {
  document.querySelectorAll('#dashboardRefresh, #managerRefresh, #refreshDashboard, [data-dashboard-refresh], [data-action="refresh-dashboard"]').forEach((el) => el.remove());
}

function shouldSkipAutoRefresh() {
  const active = document.activeElement;
  return Boolean(active && active.closest && active.closest('#commandForm, #settingsForm, #playersForm, #createInstanceForm, .autocomplete-box'));
}

async function patchConsoleLog(instanceId) {
  const log = $('#consoleLog');
  if (!log || !instanceId) return;

  const wasAtBottom = (log.scrollHeight - log.scrollTop - log.clientHeight) < 24;
  const consoleData = await get(`/api/instances/${encodeURIComponent(instanceId)}/console`);
  const lines = consoleData.lines || consoleData.console || consoleData.logs || [];
  const lineBreak = String.fromCharCode(10);
  const nextText = Array.isArray(lines) ? lines.join(lineBreak) : String(lines || 'Noch keine Logzeilen für diese Instanz.');

  if (log.textContent !== nextText) {
    log.textContent = nextText;
    if (wasAtBottom) {
      log.scrollTop = log.scrollHeight;
    }
  }
}

function patchDashboardCards(instances) {
  const grid = $('#instancesGrid');
  if (!grid) return;

  if (!instances.length) {
    grid.innerHTML = '<p class="empty-state">Noch keine Instanzen. Öffne rechts „Neue Instanz“.</p>';
    return;
  }

  const seen = new Set();

  for (const instance of instances) {
    let card = grid.querySelector(`[data-instance-card="${CSS.escape(instance.id)}"]`);

    if (!card) {
      grid.insertAdjacentHTML('beforeend', renderInstanceCard(instance));
      card = grid.querySelector(`[data-instance-card="${CSS.escape(instance.id)}"]`);
    }

    if (card) {
      patchInstanceCard(card, instance);
      seen.add(instance.id);
    }
  }

  for (const card of [...grid.querySelectorAll('[data-instance-card]')]) {
    if (!seen.has(card.dataset.instanceCard)) {
      card.remove();
    }
  }
}

async function patchSelectedRuntimeObjects(instanceSummary) {
  if (!state.selectedId || !instanceSummary || instanceSummary.id !== state.selectedId) return;

  state.selected = {
    ...(state.selected || {}),
    ...instanceSummary,
    bedrock: {
      ...((state.selected || {}).bedrock || {}),
      ...(instanceSummary.bedrock || {}),
    },
    automation: {
      ...((state.selected || {}).automation || {}),
      ...(instanceSummary.automation || {}),
    },
    status: instanceSummary.status || (state.selected || {}).status,
    health: instanceSummary.health || (state.selected || {}).health,
  };

  const title = $('#detailTitle');
  if (title) {
    title.textContent = `${state.selected.name || state.selectedId} (${state.selectedId})`;
  }

  if (state.tab === 'overview') {
    patchSelectedOverviewFacts(state.selected);
    return;
  }

  if (state.tab === 'console') {
    await patchConsoleLog(state.selectedId);
    return;
  }

  if (state.tab === 'diagnostics' && state.logLevel === 'debug') {
    const pre = $('#detailContent pre');
    if (pre) {
      pre.textContent = JSON.stringify(state.selected.status || state.selected, null, 2);
    }
  }
}

async function refreshRuntimeObjectsOnly() {
  const selectedId = state.selectedId;
  const data = await get('/api/instances');

  state.instances = sortInstances(data.instances || []);
  state.profiles = data.profiles || state.profiles || [];
  state.logLevel = String(data.manager?.log_level || data.log_level || state.logLevel || 'info').toLowerCase();

  patchManagerSummary();
  patchDashboardCards(state.instances);
  updateDiagnosticsVisibility();

  const selectedSummary = state.instances.find((instance) => instance.id === selectedId);
  if (selectedSummary) {
    await patchSelectedRuntimeObjects(selectedSummary);
  }
}

async function autoRefreshTick(force = false) {
  if (state.autoRefreshBusy) return;
  if (!force && document.hidden) return;

  state.autoRefreshBusy = true;

  try {
    await refreshRuntimeObjectsOnly();
    state.lastAutoRefreshAt = new Date().toISOString();
  } catch (err) {
    console.warn('[WinoMC] Auto-Refresh fehlgeschlagen', err);
  } finally {
    state.autoRefreshBusy = false;
  }
}

function startAutoRefresh() {
  if (state.autoRefreshTimer) {
    clearInterval(state.autoRefreshTimer);
  }

  removeManualDashboardRefreshButtons();
  state.autoRefreshTimer = setInterval(() => autoRefreshTick(false), 10000);

  if (!window.__winomcAutoRefreshVisibilityBound) {
    window.__winomcAutoRefreshVisibilityBound = true;
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) autoRefreshTick(true);
    });
  }
}


$('#createInstanceForm').onsubmit = async (ev) => {
  ev.preventDefault();

  const formEl = ev.currentTarget;
  const form = new FormData(formEl);

  const payload = {
    id: form.get('id'),
    name: form.get('name'),
    profile: form.get('profile'),
    bedrock: {
      server_port: Number(form.get('server_port')),
      server_port_v6: Number(form.get('server_port_v6')),
      level_name: form.get('level_name'),
      gamemode: form.get('gamemode'),
      difficulty: form.get('difficulty'),
      max_players: Number(form.get('max_players')),
      allowlist: Boolean(form.get('allowlist')),
    },
    automation: {
      autostart: Boolean(form.get('autostart')),
      watchdog: Boolean(form.get('watchdog')),
    },
  };

  try {
    await post('/api/instances', payload);
    formEl.reset();
    toggleCreatePanel(false);
    await loadInstances(payload.id);
  } catch (err) {
    showError(err);
  }
};

document.addEventListener('click', (ev) => {
  const autocomplete = ev.target.closest('[data-autocomplete-insert]');
  if (autocomplete) {
    applyAutocomplete(autocomplete.dataset.autocompleteInsert);
    return;
  }

  const action = ev.target.closest('[data-action]');
  if (action) {
    ev.stopPropagation();
    runAction(action.dataset.action, action.dataset.id);
    return;
  }

  const tab = ev.target.closest('[data-tab]');
  if (tab) {
    if (tab.dataset.tab === 'diagnostics' && state.logLevel !== 'debug') return;
    state.tab = tab.dataset.tab;
    document.querySelectorAll('[data-tab]').forEach((btn) => {
      btn.classList.toggle('active', btn === tab);
    });
    renderDetail().catch(showError);
    return;
  }

  const card = ev.target.closest('[data-instance-card]');
  if (card) {
    selectInstance(card.dataset.instanceCard).catch(showError);
  }
});

document.addEventListener('keydown', (ev) => {
  const card = ev.target.closest?.('[data-instance-card]');
  if (card && (ev.key === 'Enter' || ev.key === ' ')) {
    ev.preventDefault();
    selectInstance(card.dataset.instanceCard).catch(showError);
  }
});

document.addEventListener('dragstart', (ev) => {
  const card = ev.target.closest?.('[data-instance-card]');
  if (!card) return;
  state.dragId = card.dataset.instanceCard;
  ev.dataTransfer.effectAllowed = 'move';
});

document.addEventListener('dragover', (ev) => {
  const card = ev.target.closest?.('[data-instance-card]');
  if (!card || !state.dragId) return;
  ev.preventDefault();
});

document.addEventListener('drop', (ev) => {
  const card = ev.target.closest?.('[data-instance-card]');
  if (!card || !state.dragId) return;

  ev.preventDefault();

  const dropId = card.dataset.instanceCard;
  const ids = state.instances.map((inst) => inst.id);
  const from = ids.indexOf(state.dragId);
  const to = ids.indexOf(dropId);

  if (from !== -1 && to !== -1 && from !== to) {
    const [moved] = ids.splice(from, 1);
    ids.splice(to, 0, moved);
    state.order = ids;
    saveInstanceOrder();
    state.instances = sortInstances(state.instances);
    renderDashboard();
  }

  state.dragId = null;
});

if ($('#refreshInstances')) $('#refreshInstances').remove();
$('#createDrawerToggle').onclick = () => toggleCreatePanel();

setAutoMode();
loadInstances().then(() => startAutoRefresh()).catch(showError);
