const state = { instances: [], profiles: [], selectedId: null, selected: null, tab: 'overview', mode: localStorage.getItem('winomc-manager-mode') || 'pc-classic' };
const $ = (selector, root = document) => root.querySelector(selector);
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const apiPath = (path) => './' + path.replace(/^\/+/, '');
const MANAGER_INSTANCE_API_CONTRACT = [
  '/api/instances/${encodeURIComponent(id)}/start',
  '/api/instances/${encodeURIComponent(id)}/stop',
  '/api/instances/${encodeURIComponent(id)}/restart',
  '/api/instances/${encodeURIComponent(id)}/backup',
  '/api/instances/${encodeURIComponent(inst.id)}/console',
  '/api/instances/${encodeURIComponent(inst.id)}/command'
];

async function api(path, options = {}) {
  const res = await fetch(apiPath(path), { cache: 'no-store', headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options });
  const data = await res.json().catch(() => ({ ok: false, message: `HTTP ${res.status}` }));
  if (!res.ok || data.ok === false) throw data;
  return data;
}
const get = (path) => api(path);
const post = (path, payload = {}) => api(path, { method: 'POST', body: JSON.stringify(payload) });
const patch = (path, payload = {}) => api(path, { method: 'PATCH', body: JSON.stringify(payload) });

function showError(error) {
  const panel = $('#errorPanel');
  const message = error?.message || error?.error || String(error);
  panel.hidden = false;
  panel.innerHTML = `<strong>${esc(message)}</strong><p class="wm-muted">Komponente: ${esc(error?.component || 'api')} · Instanz: ${esc(error?.instance_id || state.selectedId || '-')}</p>${error?.suggested_action ? `<p>${esc(error.suggested_action)}</p>` : ''}<details><summary>Technische Details</summary><pre>${esc(JSON.stringify(error, null, 2))}</pre></details><button type="button" id="closeError">Schließen</button>`;
  $('#closeError').onclick = () => panel.hidden = true;
}

function setMode(mode) {
  state.mode = mode;
  localStorage.setItem('winomc-manager-mode', mode);
  document.body.classList.remove('mode-pc-classic', 'mode-mobile', 'mode-desktop');
  document.body.classList.add(`mode-${mode}`);
}

async function loadInstances(selectId = state.selectedId) {
  const data = await get('/api/instances');
  state.instances = data.instances || [];
  state.profiles = data.profiles || [];
  renderProfiles();
  renderDashboard();
  if (selectId && state.instances.some(i => i.id === selectId)) await selectInstance(selectId);
  else if (!state.selectedId && state.instances[0]) await selectInstance(state.instances[0].id);
}

function renderProfiles() {
  const select = $('#profileSelect');
  select.innerHTML = state.profiles.map(p => `<option value="${esc(profileKey(p))}">${esc(p.name)}</option>`).join('') || '<option value="vanilla-survival">Vanilla Survival</option>';
}
function profileKey(profile) { return String(profile?.id || profile?.key || profile?.name || 'vanilla-survival').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'vanilla-survival'; }
function instanceStatus(instance) { return instance?.status?.state || (instance?.broken ? 'broken' : 'stopped'); }

function renderDashboard() {
  $('#managerSummary').textContent = `${state.instances.length} Instanz(en) · API: /api/instances · alle Aktionen instanzbezogen`;
  $('#instancesGrid').innerHTML = state.instances.map(instance => {
    const b = instance.bedrock || {};
    const status = instanceStatus(instance);
    const health = instance.health || {};
    return `<article class="wm-instance-card ${state.selectedId === instance.id ? 'selected' : ''}">
      <div class="wm-section-head"><div><h3>${esc(instance.name || instance.id)}</h3><p class="wm-muted">${esc(instance.id)} · ${esc(instance.profile || '-')}</p></div><span class="wm-status ${esc(status)}">${esc(status)}</span></div>
      <div class="wm-meta"><span>IPv4: ${esc(b.server_port || '-')}</span><span>IPv6: ${esc(b.server_port_v6 || '-')}</span><span>Start: ${esc(instance.status?.started_at || '-')}</span><span>Health: ${health.ok === false ? 'Problem' : 'OK'}</span></div>
      ${instance.broken || health.ok === false ? `<p class="wm-muted">${esc(instance.error || (health.errors || []).join(' · ') || 'Instanz prüfen')}</p>` : ''}
      <div class="wm-card-actions">
        <button data-action="start" data-id="${esc(instance.id)}">Start</button>
        <button data-action="stop" data-id="${esc(instance.id)}">Stop</button>
        <button data-action="restart" data-id="${esc(instance.id)}">Restart</button>
        <button class="wm-primary" data-action="details" data-id="${esc(instance.id)}">Details</button>
      </div>
    </article>`;
  }).join('') || '<div class="wm-placeholder">Noch keine Instanzen. Erstelle rechts eine neue Bedrock-Instanz.</div>';
}

async function selectInstance(id) {
  state.selectedId = id;
  state.selected = await get(`/api/instances/${encodeURIComponent(id)}`);
  $('#detailTitle').textContent = `${state.selected.name || id} (${id})`;
  renderDetailActions();
  await renderDetail();
  renderDashboard();
}

function renderDetailActions() {
  $('#detailActions').innerHTML = ['start','stop','restart'].map(action => `<button data-action="${action}" data-id="${esc(state.selectedId)}">${action}</button>`).join('') + `<button class="wm-primary" data-action="backup" data-id="${esc(state.selectedId)}">Backup</button>`;
}

async function renderDetail() {
  if (!state.selected) return;
  const target = $('#detailContent');
  const inst = state.selected;
  const b = inst.bedrock || {};
  if (state.tab === 'overview') {
    target.innerHTML = `<div class="wm-meta"><span>Status: ${esc(inst.status?.state || '-')}</span><span>Profil: ${esc(inst.profile || '-')}</span><span>IPv4: ${esc(b.server_port || '-')}</span><span>IPv6: ${esc(b.server_port_v6 || '-')}</span><span>Welt: ${esc(b.level_name || '-')}</span><span>Spielmodus: ${esc(b.gamemode || '-')}</span></div>`;
  } else if (state.tab === 'console') {
    const consoleData = await get(`/api/instances/${encodeURIComponent(inst.id)}/console`);
    target.innerHTML = `<div class="wm-console-log" id="consoleLog">${esc((consoleData.lines || []).join('\n') || 'Noch keine Logzeilen für diese Instanz.')}</div><form id="commandForm" class="wm-console-input"><input name="command" placeholder="Command an ${esc(inst.id)} senden" ${inst.status?.state !== 'running' ? 'aria-describedby="consoleHint"' : ''}><button class="wm-primary">Senden</button></form><p id="consoleHint" class="wm-muted">Commands werden ausschließlich an ${esc(inst.id)} gesendet. Läuft die Instanz nicht oder wurde sie nach Manager-Neustart nicht neu gestartet, meldet die API einen Fehler.</p>`;
    $('#commandForm').onsubmit = async (ev) => { ev.preventDefault(); const command = ev.currentTarget.command.value.trim(); if (!command) return; try { await post(`/api/instances/${encodeURIComponent(inst.id)}/command`, { command }); ev.currentTarget.command.value = ''; await renderDetail(); } catch (err) { showError(err); } };
  } else if (state.tab === 'settings') {
    target.innerHTML = `<form id="settingsForm" class="wm-form"><label>Anzeigename <input name="name" value="${esc(inst.name || '')}"></label><label>Weltname <input name="level_name" value="${esc(b.level_name || 'world')}"></label><label>Max Players <input name="max_players" type="number" value="${esc(b.max_players || 10)}"></label><button class="wm-primary">Speichern</button></form>`;
    $('#settingsForm').onsubmit = async (ev) => { ev.preventDefault(); const form = new FormData(ev.currentTarget); try { await patch(`/api/instances/${encodeURIComponent(inst.id)}`, { name: form.get('name'), bedrock: { level_name: form.get('level_name'), max_players: Number(form.get('max_players')) } }); await loadInstances(inst.id); } catch (err) { showError(err); } };
  } else if (state.tab === 'files') {
    const files = await get(`/api/instances/${encodeURIComponent(inst.id)}/files`);
    target.innerHTML = `<p class="wm-muted">Instanzbezogene Dateiwurzeln. Vollständiger Dateimanager folgt in Phase 4.</p><pre>${esc(JSON.stringify(files.roots || {}, null, 2))}</pre>`;
  } else if (state.tab === 'packs') {
    const packs = await get(`/api/instances/${encodeURIComponent(inst.id)}/packs`);
    target.innerHTML = `<h3>Resource Packs</h3><p>${esc((packs.resource_packs || []).join(', ') || 'Keine Nutzerpacks')}</p><h3>Behavior Packs</h3><p>${esc((packs.behavior_packs || []).join(', ') || 'Keine Nutzerpacks')}</p>`;
  } else if (state.tab === 'backups') {
    target.innerHTML = `<p class="wm-muted">Backups werden instanzbezogen über /api/instances/${esc(inst.id)}/backup erstellt.</p><button class="wm-primary" data-action="backup" data-id="${esc(inst.id)}">Backup jetzt erstellen</button>`;
  } else {
    target.innerHTML = `<pre>${esc(JSON.stringify(inst.status || {}, null, 2))}</pre>`;
  }
}

async function runAction(action, id) {
  try {
    if (action === 'details') return selectInstance(id);
    if (action === 'backup') await post(`/api/instances/${encodeURIComponent(id)}/backup`, { type: 'manual-ui' });
    else await post(`/api/instances/${encodeURIComponent(id)}/${action}`);
    await loadInstances(id);
  } catch (err) { showError(err); }
}

$('#createInstanceForm').onsubmit = async (ev) => {
  ev.preventDefault();
  const form = new FormData(ev.currentTarget);
  const payload = { id: form.get('id'), name: form.get('name'), profile: form.get('profile'), bedrock: { server_port: Number(form.get('server_port')), server_port_v6: Number(form.get('server_port_v6')), level_name: form.get('level_name'), gamemode: form.get('gamemode'), difficulty: form.get('difficulty'), max_players: Number(form.get('max_players')), allowlist: Boolean(form.get('allowlist')) } };
  try { await post('/api/instances', payload); ev.currentTarget.reset(); await loadInstances(payload.id); } catch (err) { showError(err); }
};

document.addEventListener('click', (ev) => {
  const action = ev.target.closest('[data-action]');
  if (action) runAction(action.dataset.action, action.dataset.id);
  const tab = ev.target.closest('[data-tab]');
  if (tab) { state.tab = tab.dataset.tab; document.querySelectorAll('[data-tab]').forEach(btn => btn.classList.toggle('active', btn === tab)); renderDetail().catch(showError); }
  const mode = ev.target.closest('[data-mode]');
  if (mode) setMode(mode.dataset.mode);
});
$('#refreshInstances').onclick = () => loadInstances().catch(showError);
setMode(state.mode);
loadInstances().catch(showError);
