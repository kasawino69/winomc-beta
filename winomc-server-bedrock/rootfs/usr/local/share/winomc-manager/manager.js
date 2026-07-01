const VERSION = '2.1.6b';

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
