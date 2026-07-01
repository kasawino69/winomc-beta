from pathlib import Path
import re

repo = Path(r"C:\Users\kevin\Dokumente\GitHub\winomc-beta")

config = repo / "winomc-server-bedrock/config.yaml"
index = repo / "winomc-server-bedrock/rootfs/usr/local/share/winomc-manager/index.html"
manager_js = repo / "winomc-server-bedrock/rootfs/usr/local/share/winomc-manager/manager.js"
base_css = repo / "winomc-server-bedrock/rootfs/usr/local/share/winomc-manager/styles/base.css"
pc_css = repo / "winomc-server-bedrock/rootfs/usr/local/share/winomc-manager/styles/pc-classic.css"
mobile_css = repo / "winomc-server-bedrock/rootfs/usr/local/share/winomc-manager/styles/mobile.css"
desktop_css = repo / "winomc-server-bedrock/rootfs/usr/local/share/winomc-manager/styles/desktop.css"
changelog = repo / "winomc-server-bedrock/CHANGELOG.md"
validate = repo / "scripts/validate-winomc.sh"
validate_manager_only = repo / "scripts/validate-winomc-manager-only.sh"

def read(path):
    return path.read_text(encoding="utf-8", errors="replace")

def write(path, text):
    path.write_text(text.replace("\r\n", "\n"), encoding="utf-8")

index_html = """<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>WinoMC Manager 2.1.6b</title>
  <link rel="stylesheet" href="./assets/winomc-manager/styles/base.css">
  <link rel="stylesheet" href="./assets/winomc-manager/styles/pc-classic.css">
  <link rel="stylesheet" href="./assets/winomc-manager/styles/mobile.css">
</head>
<body class="mode-pc-classic" data-manager-app data-mode="pc-classic">
  <div id="errorPanel" class="error-panel" hidden></div>

  <header class="manager-header">
    <div>
      <p class="eyebrow">Home Assistant Add-on · Bedrock Multiinstanz</p>
      <h1>WinoMC Manager 2.1.6b</h1>
      <p id="managerSummary">Manager wird geladen…</p>
    </div>

    <nav class="mode-switcher" aria-label="Ansicht">
      <button type="button" data-mode="auto">Auto</button>
      <button type="button" data-mode="pc-classic">PC</button>
      <button type="button" data-mode="mobile">Mobile</button>
    </nav>
  </header>

  <main class="manager-shell">
    <section class="dashboard-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Dashboard</p>
          <h2>Instanzen</h2>
        </div>
        <button type="button" id="refreshInstances">Aktualisieren</button>
      </div>
      <div id="instancesGrid" class="instances-grid">
        <p class="empty-state">Manager wird geladen…</p>
      </div>
    </section>

    <section class="create-panel">
      <p class="eyebrow">Neue Instanz</p>
      <h2>Bedrock-Instanz erstellen</h2>
      <form id="createInstanceForm" class="form-grid">
        <label>Instanz-ID
          <input name="id" value="survival" autocomplete="off" required>
        </label>
        <label>Anzeigename
          <input name="name" value="Survival" autocomplete="off" required>
        </label>
        <label>Profil
          <select id="profileSelect" name="profile"></select>
        </label>
        <div class="form-grid compact">
          <label>IPv4-Port
            <input name="server_port" type="number" min="1024" max="65535" value="19132" required>
          </label>
          <label>IPv6-Port
            <input name="server_port_v6" type="number" min="1024" max="65535" value="19133" required>
          </label>
        </div>
        <label>Weltname
          <input name="level_name" value="world" autocomplete="off">
        </label>
        <div class="form-grid compact">
          <label>Gamemode
            <select name="gamemode">
              <option value="survival">survival</option>
              <option value="creative">creative</option>
              <option value="adventure">adventure</option>
            </select>
          </label>
          <label>Difficulty
            <select name="difficulty">
              <option value="peaceful">peaceful</option>
              <option value="easy">easy</option>
              <option value="normal" selected>normal</option>
              <option value="hard">hard</option>
            </select>
          </label>
        </div>
        <label>Max Players
          <input name="max_players" type="number" min="1" max="100" value="10">
        </label>
        <label class="checkbox-row">
          <input name="allowlist" type="checkbox">
          <span>Allowlist aktivieren</span>
        </label>
        <button class="primary" type="submit">Instanz erstellen</button>
      </form>
    </section>

    <section class="details-panel">
      <div class="panel-heading">
        <div>
          <p class="eyebrow">Ausgewählte Instanz</p>
          <h2 id="detailTitle">Noch keine Instanz ausgewählt</h2>
        </div>
        <div id="detailActions" class="detail-actions"></div>
      </div>

      <nav class="tabs" aria-label="Instanzbereiche">
        <button type="button" class="active" data-tab="overview">Übersicht</button>
        <button type="button" data-tab="console">Konsole</button>
        <button type="button" data-tab="settings">Einstellungen</button>
        <button type="button" data-tab="files">Dateien</button>
        <button type="button" data-tab="packs">Packs</button>
        <button type="button" data-tab="backups">Backups</button>
        <button type="button" data-tab="diagnostics">Logs/Diagnose</button>
      </nav>

      <div id="detailContent">
        <p class="empty-state">Wähle eine Instanz aus dem Dashboard.</p>
      </div>
    </section>
  </main>

  <script src="./assets/winomc-manager/manager.js"></script>
</body>
</html>
"""

manager_js_text = r"""const VERSION = '2.1.6b';

const state = {
  instances: [],
  profiles: [],
  selectedId: null,
  selected: null,
  tab: 'overview',
  modePreference: localStorage.getItem('winomc-manager-mode') || 'auto',
  mode: 'pc-classic',
};

const COMMAND_HELPER = [
  {
    title: 'Server',
    items: [
      { label: 'Spieler auflisten', command: 'list' },
      { label: 'Nachricht senden', command: 'say Hallo von WinoMC' },
      { label: 'Tag setzen', command: 'time set day' },
      { label: 'Wetter klar', command: 'weather clear' },
    ],
  },
  {
    title: 'Gamerules',
    items: [
      { label: 'Keep Inventory an', command: 'gamerule keepinventory true' },
      { label: 'Keep Inventory aus', command: 'gamerule keepinventory false' },
      { label: 'Phantome aus', command: 'gamerule doinsomnia false' },
      { label: 'Mob Griefing aus', command: 'gamerule mobgriefing false' },
    ],
  },
  {
    title: 'Spielerrechte',
    items: [
      { label: 'OP setzen', command: 'op <spielername>' },
      { label: 'OP entfernen', command: 'deop <spielername>' },
      { label: 'Gamemode Survival', command: 'gamemode survival <spielername>' },
      { label: 'Gamemode Creative', command: 'gamemode creative <spielername>' },
    ],
  },
  {
    title: 'Schwierigkeit',
    items: [
      { label: 'Peaceful', command: 'difficulty peaceful' },
      { label: 'Easy', command: 'difficulty easy' },
      { label: 'Normal', command: 'difficulty normal' },
      { label: 'Hard', command: 'difficulty hard' },
    ],
  },
];

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

const MANAGER_INSTANCE_API_CONTRACT = [
  '/api/instances',
  '/api/instances/${encodeURIComponent(id)}/start',
  '/api/instances/${encodeURIComponent(id)}/stop',
  '/api/instances/${encodeURIComponent(id)}/restart',
  '/api/instances/${encodeURIComponent(id)}/backup',
  '/api/instances/${encodeURIComponent(inst.id)}/console',
  '/api/instances/${encodeURIComponent(inst.id)}/command',
];

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

function resolveMode(preference = state.modePreference) {
  if (preference === 'mobile') return 'mobile';
  if (preference === 'pc-classic') return 'pc-classic';
  return window.matchMedia('(max-width: 760px), (pointer: coarse)').matches ? 'mobile' : 'pc-classic';
}

function setMode(preference) {
  if (!['auto', 'pc-classic', 'mobile'].includes(preference)) {
    preference = 'auto';
  }

  state.modePreference = preference;
  state.mode = resolveMode(preference);

  localStorage.setItem('winomc-manager-mode', preference);

  document.body.classList.remove('mode-pc-classic', 'mode-mobile', 'mode-desktop');
  document.body.classList.add(`mode-${state.mode}`);
  document.body.dataset.mode = state.mode;
  document.body.dataset.modePreference = preference;

  document.querySelectorAll('[data-mode]').forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === preference);
  });
}

window.matchMedia('(max-width: 760px), (pointer: coarse)').addEventListener('change', () => {
  if (state.modePreference === 'auto') {
    setMode('auto');
  }
});

async function loadInstances(selectId = state.selectedId) {
  const data = await get('/api/instances');

  state.instances = data.instances || [];
  state.profiles = data.profiles || [];

  renderProfiles();
  renderDashboard();

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

function renderDashboard() {
  $('#managerSummary').textContent = `${state.instances.length} Instanz(en) · WinoMC Manager ${VERSION} · Auto/PC/Mobile · alle Aktionen instanzbezogen`;

  $('#instancesGrid').innerHTML = state.instances.map((instance) => {
    const b = instance.bedrock || {};
    const status = instanceStatus(instance);
    const health = instance.health || {};
    const error = instance.error || (health.errors || []).join(' · ');

    return `
      <article class="instance-card status-${esc(status)}">
        <p class="eyebrow">${esc(instance.id)}</p>
        <h3>${esc(instance.name || instance.id)}</h3>
        <span class="status-pill">${esc(status)}</span>

        <dl class="facts">
          <div><dt>Profil</dt><dd>${esc(instance.profile || '-')}</dd></div>
          <div><dt>IPv4</dt><dd>${esc(b.server_port || '-')}</dd></div>
          <div><dt>IPv6</dt><dd>${esc(b.server_port_v6 || '-')}</dd></div>
          <div><dt>Start</dt><dd>${esc(instance.status?.started_at || '-')}</dd></div>
          <div><dt>Health</dt><dd>${health.ok === false ? 'Problem' : 'OK'}</dd></div>
        </dl>

        ${instance.broken || health.ok === false ? `<p class="warn-box">${esc(error || 'Instanz prüfen')}</p>` : ''}

        <div class="card-actions">
          <button type="button" data-action="start" data-id="${esc(instance.id)}">Start</button>
          <button type="button" data-action="stop" data-id="${esc(instance.id)}">Stop</button>
          <button type="button" data-action="restart" data-id="${esc(instance.id)}">Restart</button>
          <button type="button" data-action="details" data-id="${esc(instance.id)}">Details</button>
        </div>
      </article>
    `;
  }).join('') || '<p class="empty-state">Noch keine Instanzen. Erstelle rechts eine neue Bedrock-Instanz.</p>';
}

async function selectInstance(id) {
  state.selectedId = id;
  state.selected = unwrapInstance(await get(`/api/instances/${encodeURIComponent(id)}`));

  $('#detailTitle').textContent = `${state.selected.name || id} (${id})`;

  renderDetailActions();
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

function renderCommandHelper() {
  return `
    <section class="command-helper" aria-label="Befehlshilfe">
      <div class="command-helper-heading">
        <div>
          <p class="eyebrow">Befehlshilfe</p>
          <h3>Command Helper</h3>
        </div>
        <p class="hint">Ein Klick übernimmt den Befehl in die Eingabe. Gesendet wird erst über „Senden“.</p>
      </div>

      <div class="command-helper-grid">
        ${COMMAND_HELPER.map((group) => `
          <article class="command-group">
            <h4>${esc(group.title)}</h4>
            <div class="command-chip-list">
              ${group.items.map((item) => `
                <button type="button" class="command-chip" data-helper-command="${esc(item.command)}">
                  <span>${esc(item.label)}</span>
                  <code>${esc(item.command)}</code>
                </button>
              `).join('')}
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

async function renderDetail() {
  if (!state.selected) return;

  const target = $('#detailContent');
  const inst = state.selected;
  const b = inst.bedrock || {};

  if (state.tab === 'overview') {
    target.innerHTML = `
      <dl class="facts large">
        <div><dt>Status</dt><dd>${esc(inst.status?.state || '-')}</dd></div>
        <div><dt>Profil</dt><dd>${esc(inst.profile || '-')}</dd></div>
        <div><dt>IPv4</dt><dd>${esc(b.server_port || '-')}</dd></div>
        <div><dt>IPv6</dt><dd>${esc(b.server_port_v6 || '-')}</dd></div>
        <div><dt>Welt</dt><dd>${esc(b.level_name || '-')}</dd></div>
        <div><dt>Spielmodus</dt><dd>${esc(b.gamemode || '-')}</dd></div>
      </dl>
    `;
  } else if (state.tab === 'console') {
    const consoleData = await get(`/api/instances/${encodeURIComponent(inst.id)}/console`);
    const lines = consoleData.lines || consoleData.console || consoleData.logs || [];

    target.innerHTML = `
      <pre class="console-log">${esc(Array.isArray(lines) ? lines.join('\n') : String(lines || 'Noch keine Logzeilen für diese Instanz.'))}</pre>

      ${renderCommandHelper()}

      <form id="commandForm" class="command-form">
        <input name="command" autocomplete="off" placeholder="say Hallo von WinoMC">
        <button type="submit" class="primary">Senden</button>
      </form>

      <p class="hint">Commands werden ausschließlich an ${esc(inst.id)} gesendet.</p>
    `;

    $('#commandForm').onsubmit = async (ev) => {
      ev.preventDefault();
      const formEl = ev.currentTarget;
      const command = formEl.command.value.trim();

      if (!command) return;

      try {
        await post(`/api/instances/${encodeURIComponent(inst.id)}/command`, { command });
        formEl.command.value = '';
        await renderDetail();
      } catch (err) {
        showError(err);
      }
    };
  } else if (state.tab === 'settings') {
    target.innerHTML = `
      <form id="settingsForm" class="form-grid compact">
        <label>Anzeigename
          <input name="name" value="${esc(inst.name || '')}">
        </label>
        <label>Weltname
          <input name="level_name" value="${esc(b.level_name || '')}">
        </label>
        <label>Max Players
          <input name="max_players" type="number" value="${esc(b.max_players || 10)}">
        </label>
        <button type="submit" class="primary">Speichern</button>
      </form>
      <p class="hint">Profile auf bestehende Instanzen folgen in einem eigenen Schritt.</p>
    `;

    $('#settingsForm').onsubmit = async (ev) => {
      ev.preventDefault();
      const formEl = ev.currentTarget;
      const form = new FormData(formEl);

      try {
        await patch(`/api/instances/${encodeURIComponent(inst.id)}`, {
          name: form.get('name'),
          bedrock: {
            level_name: form.get('level_name'),
            max_players: Number(form.get('max_players')),
          },
        });

        await loadInstances(inst.id);
      } catch (err) {
        showError(err);
      }
    };
  } else if (state.tab === 'files') {
    const files = await get(`/api/instances/${encodeURIComponent(inst.id)}/files`);

    target.innerHTML = `
      <p class="hint">Instanzbezogene Dateiwurzeln. Der vollständige Dateiexplorer folgt in 2.1.8b.</p>
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
      <p>Backups werden instanzbezogen über <code>/api/instances/${esc(inst.id)}/backup</code> erstellt.</p>
      <button type="button" class="primary" data-action="backup" data-id="${esc(inst.id)}">Backup jetzt erstellen</button>
    `;
  } else {
    target.innerHTML = `<pre>${esc(JSON.stringify(inst.status || inst, null, 2))}</pre>`;
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
  };

  try {
    await post('/api/instances', payload);
    formEl.reset();
    await loadInstances(payload.id);
  } catch (err) {
    showError(err);
  }
};

document.addEventListener('click', (ev) => {
  const helper = ev.target.closest('[data-helper-command]');
  if (helper) {
    const input = $('#commandForm input[name="command"]');
    if (input) {
      input.value = helper.dataset.helperCommand || '';
      input.focus();
    }
    return;
  }

  const action = ev.target.closest('[data-action]');
  if (action) {
    runAction(action.dataset.action, action.dataset.id);
    return;
  }

  const tab = ev.target.closest('[data-tab]');
  if (tab) {
    state.tab = tab.dataset.tab;
    document.querySelectorAll('[data-tab]').forEach((btn) => {
      btn.classList.toggle('active', btn === tab);
    });
    renderDetail().catch(showError);
    return;
  }

  const mode = ev.target.closest('[data-mode]');
  if (mode) {
    setMode(mode.dataset.mode);
  }
});

$('#refreshInstances').onclick = () => loadInstances().catch(showError);

setMode(state.modePreference);
loadInstances().catch(showError);
"""

base_css_text = """:root {
  color-scheme: dark;
  --bg: #0f172a;
  --panel: rgba(15, 23, 42, 0.88);
  --panel-soft: rgba(30, 41, 59, 0.78);
  --border: rgba(148, 163, 184, 0.22);
  --text: #e5e7eb;
  --muted: #94a3b8;
  --accent: #38bdf8;
  --danger: #fb7185;
  --ok: #34d399;
  --warn: #fbbf24;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

html,
body {
  min-height: 100%;
  margin: 0;
}

body {
  background: radial-gradient(circle at top left, rgba(56, 189, 248, .20), transparent 32rem), var(--bg);
  color: var(--text);
  padding: 20px;
}

button,
input,
select {
  font: inherit;
}

button,
.primary {
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(30, 41, 59, .92);
  color: var(--text);
  padding: 9px 12px;
  cursor: pointer;
}

button:hover,
button.active {
  border-color: var(--accent);
  color: var(--accent);
}

button.primary,
.primary {
  background: rgba(14, 165, 233, .24);
  border-color: rgba(56, 189, 248, .55);
}

input,
select {
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: rgba(2, 6, 23, .55);
  color: var(--text);
  padding: 10px;
}

label {
  display: grid;
  gap: 6px;
  color: var(--muted);
}

pre {
  white-space: pre-wrap;
  overflow: auto;
}

code {
  color: var(--accent);
}

[hidden],
.error-panel[hidden],
.manager-modal[hidden],
.manager-overlay[hidden] {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

.manager-header,
.dashboard-panel,
.create-panel,
.details-panel,
.error-card,
.instance-card,
.command-helper,
.command-group {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 22px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, .25);
}

.manager-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px;
  margin-bottom: 18px;
}

.manager-header h1,
.panel-heading h2,
.instance-card h3,
.command-helper h3,
.command-group h4 {
  margin: 0;
}

.eyebrow {
  margin: 0 0 4px;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: .08em;
  font-size: 12px;
  font-weight: 700;
}

.manager-header p,
.hint,
.empty-state {
  color: var(--muted);
}

.mode-switcher,
.card-actions,
.detail-actions,
.tabs,
.command-form,
.command-chip-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.manager-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(280px, .65fr);
  grid-template-areas:
    "dashboard create"
    "details details";
  gap: 18px;
}

.dashboard-panel {
  grid-area: dashboard;
  padding: 18px;
}

.create-panel {
  grid-area: create;
  padding: 18px;
}

.details-panel {
  grid-area: details;
  padding: 18px;
}

.panel-heading,
.command-helper-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.instances-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 14px;
}

.instance-card {
  padding: 16px;
}

.status-pill {
  display: inline-flex;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px 10px;
  color: var(--muted);
  margin-top: 8px;
}

.status-running .status-pill {
  color: var(--ok);
  border-color: rgba(52, 211, 153, .45);
}

.status-crashed .status-pill,
.status-broken .status-pill {
  color: var(--danger);
  border-color: rgba(251, 113, 133, .45);
}

.facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 12px 0;
}

.facts div {
  background: var(--panel-soft);
  border-radius: 12px;
  padding: 10px;
}

.facts dt {
  color: var(--muted);
  font-size: 12px;
}

.facts dd {
  margin: 3px 0 0;
}

.facts.large {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.form-grid {
  display: grid;
  gap: 12px;
}

.form-grid.compact {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-row input {
  width: auto;
}

.tabs {
  border-bottom: 1px solid var(--border);
  padding-bottom: 10px;
  margin-bottom: 14px;
}

.tabs button.active {
  border-color: var(--accent);
  color: var(--accent);
}

.console-log {
  min-height: 260px;
  max-height: 420px;
  background: #020617;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px;
}

.command-form input {
  flex: 1 1 240px;
  width: auto;
}

.command-helper {
  margin: 16px 0;
  padding: 16px;
}

.command-helper-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.command-group {
  padding: 12px;
  background: rgba(2, 6, 23, .35);
}

.command-chip {
  display: grid;
  gap: 4px;
  text-align: left;
  flex: 1 1 160px;
}

.command-chip code {
  font-size: 12px;
  color: var(--muted);
}

.error-panel:not([hidden]) {
  position: fixed;
  inset: 20px;
  z-index: 1000;
  display: grid;
  place-items: center;
  background: rgba(2, 6, 23, 0.66);
  pointer-events: auto;
}

.error-card {
  width: min(760px, 100%);
  padding: 18px;
}

.warn-box,
.suggested-action {
  border: 1px solid rgba(251, 191, 36, .35);
  background: rgba(251, 191, 36, .10);
  color: #fde68a;
  border-radius: 12px;
  padding: 10px;
}

.manager-shell::before,
.manager-shell::after {
  pointer-events: none;
}
"""

pc_css_text = """body.mode-pc-classic .manager-shell,
body.mode-pc-classic .manager-header {
  max-width: 1480px;
  margin-left: auto;
  margin-right: auto;
}

body.mode-pc-classic .details-panel {
  min-height: 460px;
}

body.mode-pc-classic .console-log {
  min-height: 320px;
}
"""

mobile_css_text = """@media (max-width: 760px) {
  body {
    padding: 10px;
  }

  .manager-header {
    flex-direction: column;
    align-items: stretch;
  }

  .manager-shell {
    grid-template-columns: 1fr;
    grid-template-areas:
      "dashboard"
      "create"
      "details";
  }

  .instances-grid,
  .facts,
  .facts.large,
  .command-helper-grid {
    grid-template-columns: 1fr;
  }

  .tabs {
    overflow-x: auto;
    flex-wrap: nowrap;
  }
}

body.mode-mobile {
  padding: 10px;
}

body.mode-mobile .manager-header {
  flex-direction: column;
  align-items: stretch;
}

body.mode-mobile .manager-shell {
  grid-template-columns: 1fr;
  grid-template-areas:
    "dashboard"
    "create"
    "details";
}

body.mode-mobile .instances-grid,
body.mode-mobile .facts,
body.mode-mobile .facts.large,
body.mode-mobile .command-helper-grid {
  grid-template-columns: 1fr;
}

body.mode-mobile .tabs {
  overflow-x: auto;
  flex-wrap: nowrap;
}

body.mode-mobile .card-actions button,
body.mode-mobile .detail-actions button,
body.mode-mobile .mode-switcher button {
  flex: 1 1 auto;
}

body.mode-mobile .console-log {
  max-height: 340px;
}
"""

desktop_css_text = """/* WinoMC 2.1.6b: Desktop mode was intentionally retired.
   The Manager now supports only Auto, PC and Mobile modes. */
"""

write(index, index_html)
write(manager_js, manager_js_text)
write(base_css, base_css_text)
write(pc_css, pc_css_text)
write(mobile_css, mobile_css_text)
write(desktop_css, desktop_css_text)

cfg = read(config)
cfg = re.sub(
    r"version:\s*2\.1(?:b\.1|\.1b|\.2b|\.3b|\.4b|\.5b|\.6b)",
    "version: 2.1.6b",
    cfg,
)
cfg = re.sub(
    r'WINOMC_VERSION:\s*"2\.1(?:b\.1|\.1b|\.2b|\.3b|\.4b|\.5b|\.6b)"',
    'WINOMC_VERSION: "2.1.6b"',
    cfg,
)
write(config, cfg)

entry = """## WinoMC 2.1.6b - PC/Mobile UX and Command Helper Recovery

### Fixed
- Restored a structured command helper in the instance console tab.
- Command helper buttons now only fill the command input; commands are still sent explicitly by the user.
- Commands remain strictly instance-scoped through `/api/instances/<id>/command`.

### Changed
- Removed the Desktop Mode from the active WinoMC Manager UI.
- Replaced the old three-mode switch with Auto, PC and Mobile.
- Auto mode detects mobile/touch-style layouts and otherwise uses the PC layout.
- The Manager now focuses on two maintained UX targets: PC and Mobile.
- Bumped beta version to `2.1.6b`.

### Improved
- Rebuilt the Manager UI shell with cleaner PC/Mobile separation.
- Simplified CSS mode ownership:
  - `base.css` contains shared UI foundations.
  - `pc-classic.css` contains PC layout adjustments.
  - `mobile.css` contains mobile/touch layout adjustments.
  - `desktop.css` is retired and no longer loaded by the UI.
- Added clear placeholders for the next recovery steps: player rights, file explorer and profile application.

### Notes
- This keeps the confirmed 2.1.5b multi-instance runtime foundation intact.
- Bedrock remains the only active runtime.
- Java support remains planned for later, after Bedrock is complete.
- Next planned recovery steps: player rights, file explorer and profile application for existing instances.

"""

old_changelog = read(changelog) if changelog.exists() else ""
if "## WinoMC 2.1.6b - PC/Mobile UX and Command Helper Recovery" not in old_changelog:
    write(changelog, entry + old_changelog)

if validate.exists():
    v = read(validate)
    v = v.replace("manager_ui_dir/'styles/mobile.css', manager_ui_dir/'styles/desktop.css'", "manager_ui_dir/'styles/mobile.css', manager_ui_dir/'styles/desktop.css'")
    v = v.replace("'mode-pc-classic', 'mode-mobile', 'mode-desktop'", "'mode-pc-classic', 'mode-mobile'")
    v = v.replace("if 'version: 2.1b' not in text:", "if 'version: 2.1.6b' not in text:")
    v = v.replace("config.yaml version is not 2.1b", "config.yaml version is not 2.1.6b")
    if "(shared/'resource_packs'/'vanilla')" not in v:
        v = v.replace(
            "shared.mkdir(parents=True)",
            "shared.mkdir(parents=True); (shared/'resource_packs'/'vanilla').mkdir(parents=True, exist_ok=True); (shared/'behavior_packs'/'vanilla').mkdir(parents=True, exist_ok=True)"
        )
    write(validate, v)

validate_manager_only_text = """#!/usr/bin/env sh
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
ADDON="${ROOT}/winomc-server-bedrock"
DOCKERFILE="${ADDON}/Dockerfile"
CONFIG="${ADDON}/config.yaml"
ENTRYPOINT="${ADDON}/rootfs/usr/local/bin/winomc-bedrock-entrypoint"
SERVER="${ADDON}/rootfs/usr/local/bin/winomc-console-server"
MANAGER_DIR="${ADDON}/rootfs/usr/local/share/winomc-manager"

fail() {
  echo "ERROR: $*" >&2
  exit 1
}

[ -f "${DOCKERFILE}" ] || fail "Dockerfile fehlt"
[ -f "${CONFIG}" ] || fail "config.yaml fehlt"
[ -f "${ENTRYPOINT}" ] || fail "winomc-bedrock-entrypoint fehlt"
[ -f "${SERVER}" ] || fail "winomc-console-server fehlt"
[ -f "${MANAGER_DIR}/index.html" ] || fail "Manager index.html fehlt"
[ -f "${MANAGER_DIR}/manager.js" ] || fail "Manager manager.js fehlt"
[ -f "${MANAGER_DIR}/styles/base.css" ] || fail "Manager base.css fehlt"
[ -f "${MANAGER_DIR}/styles/pc-classic.css" ] || fail "Manager pc-classic.css fehlt"
[ -f "${MANAGER_DIR}/styles/mobile.css" ] || fail "Manager mobile.css fehlt"

! grep -q '9ea674efee332dbb60c91ccdf6f572082fc2c1aa' "${DOCKERFILE}" || fail "Dockerfile lädt alten winomc-console-server aus 9ea674ef nach"
! grep -qi 'Restoring last known working WinoMC ingress console frontend' "${DOCKERFILE}" || fail "Dockerfile enthält alten Restore-Block"
! grep -q 'winomc-runtime-ux-patch' "${DOCKERFILE}" || fail "Dockerfile startet alten Runtime-UX-Patch"
! grep -q 'winomc-runtime-ux-polish' "${DOCKERFILE}" || fail "Dockerfile startet alten Runtime-UX-Polish"

! grep -q '^  ENABLE_WEB_CONSOLE:' "${CONFIG}" || fail "config.yaml enthält noch ENABLE_WEB_CONSOLE"
! grep -q '^  WINOMC_EXPERIMENTAL_MANAGER_REBUILD:' "${CONFIG}" || fail "config.yaml enthält noch experimentellen Manager-Schalter"
grep -q 'version: 2.1.6b' "${CONFIG}" || fail "config.yaml Version ist nicht 2.1.6b"
grep -q 'WINOMC_VERSION: "2.1.6b"' "${CONFIG}" || fail "WINOMC_VERSION ist nicht 2.1.6b"
grep -q 'WINOMC_MANAGER_PORT' "${CONFIG}" || fail "config.yaml enthält keinen WINOMC_MANAGER_PORT"

! grep -q 'winomc-native-start' "${ENTRYPOINT}" || fail "Entrypoint startet noch globale native Single-Server-Runtime"
! grep -q 'mkfifo' "${ENTRYPOINT}" || fail "Entrypoint erstellt noch globale Console-FIFO"
! grep -q 'run_stdin_bridge' "${ENTRYPOINT}" || fail "Entrypoint enthält noch globale STDIN-Bridge"
grep -q 'Manager-only boot' "${ENTRYPOINT}" || fail "Entrypoint kennzeichnet Manager-only Boot nicht"

grep -q 'WinoMC Manager 2.1.6b' "${MANAGER_DIR}/index.html" || fail "Manager index enthält keine sichtbare 2.1.6b Kennzeichnung"
grep -q 'data-manager-app' "${MANAGER_DIR}/index.html" || fail "Manager index enthält keinen data-manager-app Marker"
grep -q 'mode-pc-classic' "${MANAGER_DIR}/index.html" || fail "Manager index enthält keine PC Mode-Klasse"
grep -q 'mode-mobile' "${MANAGER_DIR}/manager.js" || fail "Manager JS enthält keine Mobile Mode-Klasse"
! grep -q 'data-mode="desktop"' "${MANAGER_DIR}/index.html" || fail "Desktop Mode ist noch im Manager sichtbar"
! grep -q 'mode-desktop' "${MANAGER_DIR}/manager.js" || fail "Desktop Mode ist noch im Manager JS aktiv"
! grep -q 'styles/desktop.css' "${MANAGER_DIR}/index.html" || fail "Desktop CSS wird noch geladen"

grep -q '/api/instances' "${MANAGER_DIR}/manager.js" || fail "Manager JS nutzt keine Instanz-API"
grep -q '/command' "${MANAGER_DIR}/manager.js" || fail "Manager JS enthält keine instanzbezogene Command-Route"
! grep -q "post('/api/command" "${MANAGER_DIR}/manager.js" || fail "Manager JS nutzt noch globale /api/command Route"
grep -q 'COMMAND_HELPER' "${MANAGER_DIR}/manager.js" || fail "Command Helper fehlt"
grep -q 'data-helper-command' "${MANAGER_DIR}/manager.js" || fail "Command Helper Buttons fehlen"
grep -q '&amp;' "${MANAGER_DIR}/manager.js" || fail "Manager JS enthält kein korrektes HTML-Escaping für &"
grep -q '&lt;' "${MANAGER_DIR}/manager.js" || fail "Manager JS enthält kein korrektes HTML-Escaping für <"

python3 -m py_compile "${SERVER}"

if command -v git >/dev/null 2>&1 && [ -d "${ROOT}/.git" ]; then
  git -C "${ROOT}" diff --check
fi

echo "WinoMC 2.1.6b manager-only PC/Mobile validation OK"
"""
write(validate_manager_only, validate_manager_only_text)

required = {
    index: ["WinoMC Manager 2.1.6b", 'data-mode="auto"', 'data-mode="pc-classic"', 'data-mode="mobile"'],
    manager_js: ["COMMAND_HELPER", "data-helper-command", "mode-mobile", "mode-pc-classic", "/api/instances"],
    base_css: ["command-helper", ".error-panel:not([hidden])"],
    config: ["version: 2.1.6b", 'WINOMC_VERSION: "2.1.6b"'],
    changelog: ["WinoMC 2.1.6b - PC/Mobile UX and Command Helper Recovery"],
}

for path, markers in required.items():
    text = read(path)
    for marker in markers:
        if marker not in text:
            raise RuntimeError(f"Marker fehlt in {path}: {marker}")

if "data-mode=\"desktop\"" in read(index):
    raise RuntimeError("Desktop Mode ist noch im index aktiv.")

if "mode-desktop" in read(manager_js):
    raise RuntimeError("Desktop Mode ist noch im manager.js aktiv.")

print("WinoMC 2.1.6b PC/Mobile UX patch applied successfully.")
