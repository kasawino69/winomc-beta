const VERSION = '2.1.8b';

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
};

const BEDROCK_COMMAND_CATALOG_SOURCE = 'Microsoft Minecraft Bedrock Commands Reference + Bedrock /help syntax model';

const COMMAND_CATALOG = [
  { command: 'ability', description: 'Sets a player ability.', syntax: ['ability <player: target> <ability: Ability> <value: Boolean>'], args: ['target', 'ability', 'boolean'], permission: 'cheats' },
  { command: 'allowlist', description: 'Manages the Bedrock server allowlist.', syntax: ['allowlist add <name: id>', 'allowlist remove <name: id>', 'allowlist list', 'allowlist reload', 'allowlist on', 'allowlist off'], args: ['allowlistAction', 'player'], permission: 'server' },
  { command: 'alwaysday', description: 'Locks or unlocks the day-night cycle.', syntax: ['alwaysday [lock: Boolean]'], args: ['boolean'], permission: 'cheats' },
  { command: 'camera', description: 'Controls cameras for players.', syntax: ['camera <players: target> clear', 'camera <players: target> fade', 'camera <players: target> set <preset: string>'], args: ['target', 'cameraAction'], permission: 'cheats' },
  { command: 'camerashake', description: 'Applies or stops camera shake.', syntax: ['camerashake add <player: target> [intensity: float] [seconds: float] [shakeType: CameraShakeType]', 'camerashake stop <player: target>'], args: ['target', 'cameraShakeAction'], permission: 'cheats' },
  { command: 'changesetting', description: 'Changes server settings where supported.', syntax: ['changesetting allow-cheats <value: Boolean>', 'changesetting difficulty <difficulty: Difficulty>'], args: ['boolean', 'difficulty'], permission: 'server' },
  { command: 'clear', description: 'Clears items from player inventory.', syntax: ['clear [player: target] [itemName: Item] [data: int] [maxCount: int]'], args: ['target', 'item'], permission: 'cheats' },
  { command: 'clearspawnpoint', description: 'Clears player spawn point.', syntax: ['clearspawnpoint [player: target]'], args: ['target'], permission: 'cheats' },
  { command: 'clone', description: 'Clones blocks from one region to another.', syntax: ['clone <begin: x y z> <end: x y z> <destination: x y z> [maskMode: MaskMode] [cloneMode: CloneMode]'], args: ['position'], permission: 'cheats' },
  { command: 'connect', description: 'Connects to a server where supported.', syntax: ['connect <serverUri: string>'], args: ['string'], permission: 'normal' },
  { command: 'damage', description: 'Applies damage to entities.', syntax: ['damage <target: target> <amount: int> [cause: DamageCause] [entity: target]'], args: ['target', 'number'], permission: 'cheats' },
  { command: 'daylock', description: 'Locks or unlocks the day-night cycle.', syntax: ['daylock [lock: Boolean]'], args: ['boolean'], permission: 'cheats' },
  { command: 'deop', description: 'Removes operator status from a player.', syntax: ['deop <player: target>'], args: ['player'], permission: 'server' },
  { command: 'dialogue', description: 'Opens or changes NPC dialogue.', syntax: ['dialogue open <npc: target> <player: target> [sceneName: string]', 'dialogue change <npc: target> <sceneName: string> [player: target]'], args: ['target', 'string'], permission: 'cheats' },
  { command: 'difficulty', description: 'Sets the world difficulty.', syntax: ['difficulty peaceful', 'difficulty easy', 'difficulty normal', 'difficulty hard'], args: ['difficulty'], permission: 'cheats' },
  { command: 'effect', description: 'Adds or clears status effects.', syntax: ['effect <player: target> clear [effect: Effect]', 'effect <player: target> <effect: Effect> [seconds: int] [amplifier: int] [hideParticles: Boolean]'], args: ['target', 'effect', 'number', 'boolean'], permission: 'cheats' },
  { command: 'enchant', description: 'Adds an enchantment to a player item.', syntax: ['enchant <player: target> <enchantmentName: Enchant> [level: int]'], args: ['target', 'enchant', 'number'], permission: 'cheats' },
  { command: 'event', description: 'Triggers an entity event.', syntax: ['event entity <target: target> <eventName: string>'], args: ['target', 'string'], permission: 'cheats' },
  { command: 'execute', description: 'Executes another command with modified context.', syntax: ['execute as <origin: target> run <command: command>', 'execute at <origin: target> run <command: command>', 'execute positioned <position: x y z> run <command: command>', 'execute if entity <target: target> run <command: command>'], args: ['target', 'position', 'command'], permission: 'cheats' },
  { command: 'fill', description: 'Fills a region with a block.', syntax: ['fill <from: x y z> <to: x y z> <tileName: Block> [blockStates: block states] [oldBlockHandling: FillMode]'], args: ['position', 'block'], permission: 'cheats' },
  { command: 'fog', description: 'Manages fog settings for players.', syntax: ['fog <victim: target> push <fogID: string> <userProvidedId: string>', 'fog <victim: target> pop <userProvidedId: string>', 'fog <victim: target> remove <userProvidedId: string>'], args: ['target', 'string'], permission: 'cheats' },
  { command: 'function', description: 'Runs a function file.', syntax: ['function <name: filepath>'], args: ['function'], permission: 'cheats' },
  { command: 'gamemode', description: 'Sets game mode.', syntax: ['gamemode survival [player: target]', 'gamemode creative [player: target]', 'gamemode adventure [player: target]', 'gamemode spectator [player: target]'], args: ['gamemode', 'target'], permission: 'cheats' },
  { command: 'gamerule', description: 'Sets or queries a game rule.', syntax: ['gamerule <rule: GameRule> [value: Boolean]', 'gamerule <rule: GameRule> [value: int]'], args: ['gamerule', 'boolean', 'number'], permission: 'cheats' },
  { command: 'gametest', description: 'Runs GameTest features where enabled.', syntax: ['gametest run <testName: string>', 'gametest runall'], args: ['string'], permission: 'cheats' },
  { command: 'give', description: 'Gives items to players.', syntax: ['give <player: target> <itemName: Item> [amount: int] [data: int] [components: json]'], args: ['target', 'item', 'number'], permission: 'cheats' },
  { command: 'help', description: 'Shows command help.', syntax: ['help', 'help <page: int>', 'help <command: CommandName>'], args: ['command', 'number'], permission: 'normal' },
  { command: 'hud', description: 'Changes HUD visibility.', syntax: ['hud <target: target> hide <hudElement: HudElement>', 'hud <target: target> reset <hudElement: HudElement>'], args: ['target'], permission: 'cheats' },
  { command: 'immutableworld', description: 'Sets immutable world state.', syntax: ['immutableworld [value: Boolean]'], args: ['boolean'], permission: 'cheats' },
  { command: 'inputpermission', description: 'Manages input permissions.', syntax: ['inputpermission set <targets: target> <permission: InputPermission> <state: PermissionState>', 'inputpermission query <targets: target> <permission: InputPermission>'], args: ['target'], permission: 'cheats' },
  { command: 'kick', description: 'Kicks a player from the server.', syntax: ['kick <name: target> [reason: message]'], args: ['player', 'message'], permission: 'server' },
  { command: 'kill', description: 'Kills entities.', syntax: ['kill [target: target]'], args: ['target'], permission: 'cheats' },
  { command: 'list', description: 'Lists players on the server.', syntax: ['list'], args: [], permission: 'normal' },
  { command: 'locate', description: 'Locates structures or biomes.', syntax: ['locate structure <feature: StructureFeature>', 'locate biome <biome: Biome>'], args: ['structure', 'biome'], permission: 'cheats' },
  { command: 'loot', description: 'Drops loot from loot tables or entities.', syntax: ['loot spawn <position: x y z> loot <lootTable: string>', 'loot give <players: target> loot <lootTable: string>'], args: ['position', 'target', 'string'], permission: 'cheats' },
  { command: 'me', description: 'Displays a message about yourself.', syntax: ['me <action: message>'], args: ['message'], permission: 'normal' },
  { command: 'mobevent', description: 'Controls mob events.', syntax: ['mobevent <event: MobEvent> [value: Boolean]'], args: ['boolean'], permission: 'cheats' },
  { command: 'msg', description: 'Sends a private message.', syntax: ['msg <target: target> <message: message>'], args: ['target', 'message'], permission: 'normal' },
  { command: 'music', description: 'Controls music playback.', syntax: ['music play <trackName: string> [volume: float] [fadeSeconds: float] [repeatMode: MusicRepeatMode]', 'music stop [fadeSeconds: float]', 'music volume <volume: float>'], args: ['string', 'number'], permission: 'cheats' },
  { command: 'op', description: 'Grants operator status to a player.', syntax: ['op <player: target>'], args: ['player'], permission: 'server' },
  { command: 'particle', description: 'Creates particles.', syntax: ['particle <effect: string> [position: x y z]'], args: ['string', 'position'], permission: 'cheats' },
  { command: 'permission', description: 'Reloads or lists permissions where supported.', syntax: ['permission list', 'permission reload'], args: [], permission: 'server' },
  { command: 'place', description: 'Places a feature, jigsaw or structure.', syntax: ['place feature <feature: string> [position: x y z]', 'place structure <structure: string> [position: x y z]'], args: ['string', 'position'], permission: 'cheats' },
  { command: 'playsound', description: 'Plays a sound.', syntax: ['playsound <sound: string> [player: target] [position: x y z] [volume: float] [pitch: float] [minimumVolume: float]'], args: ['string', 'target', 'position'], permission: 'cheats' },
  { command: 'recipe', description: 'Gives or takes recipes.', syntax: ['recipe give <player: target> <recipe: string>', 'recipe take <player: target> <recipe: string>'], args: ['target', 'string'], permission: 'cheats' },
  { command: 'reload', description: 'Reloads functions and behavior packs where supported.', syntax: ['reload'], args: [], permission: 'server' },
  { command: 'replaceitem', description: 'Replaces items in inventory slots.', syntax: ['replaceitem entity <target: target> <slotType: EntityEquipmentSlot> <slotId: int> <itemName: Item> [amount: int] [data: int]', 'replaceitem block <position: x y z> <slotId: int> <itemName: Item> [amount: int] [data: int]'], args: ['target', 'position', 'item'], permission: 'cheats' },
  { command: 'ride', description: 'Makes entities ride or stop riding.', syntax: ['ride <riders: target> start_riding <ride: target>', 'ride <riders: target> stop_riding'], args: ['target'], permission: 'cheats' },
  { command: 'say', description: 'Broadcasts a message to all players.', syntax: ['say <message: message>'], args: ['message'], permission: 'normal' },
  { command: 'scoreboard', description: 'Manages scoreboards.', syntax: ['scoreboard objectives list', 'scoreboard objectives add <objective: string> dummy [displayName: string]', 'scoreboard objectives remove <objective: string>', 'scoreboard players list [player: target]', 'scoreboard players set <player: target> <objective: string> <count: int>'], args: ['target', 'string', 'number'], permission: 'cheats' },
  { command: 'script', description: 'Runs script debugger commands where available.', syntax: ['script debugger connect <host: string> <port: int>'], args: ['string', 'number'], permission: 'debug' },
  { command: 'scriptevent', description: 'Triggers a script event.', syntax: ['scriptevent <messageId: string> [message: message]'], args: ['string', 'message'], permission: 'cheats' },
  { command: 'setblock', description: 'Sets a block.', syntax: ['setblock <position: x y z> <tileName: Block> [blockStates: block states] [oldBlockHandling: SetBlockMode]'], args: ['position', 'block'], permission: 'cheats' },
  { command: 'setmaxplayers', description: 'Sets maximum players for this session.', syntax: ['setmaxplayers <maxPlayers: int>'], args: ['number'], permission: 'server' },
  { command: 'setworldspawn', description: 'Sets world spawn.', syntax: ['setworldspawn [spawnPoint: x y z]'], args: ['position'], permission: 'cheats' },
  { command: 'spawnpoint', description: 'Sets player spawn point.', syntax: ['spawnpoint [player: target] [spawnPos: x y z]'], args: ['target', 'position'], permission: 'cheats' },
  { command: 'spreadplayers', description: 'Spreads entities around a location.', syntax: ['spreadplayers <x: value> <z: value> <spreadDistance: float> <maxRange: float> <victim: target>'], args: ['target', 'number'], permission: 'cheats' },
  { command: 'stopsound', description: 'Stops sounds.', syntax: ['stopsound <player: target> [sound: string]'], args: ['target', 'string'], permission: 'cheats' },
  { command: 'structure', description: 'Saves, loads or deletes structures.', syntax: ['structure save <name: string> <from: x y z> <to: x y z> [saveMode: StructureSaveMode]', 'structure load <name: string> <to: x y z> [rotation: Rotation] [mirror: Mirror]', 'structure delete <name: string>'], args: ['string', 'position'], permission: 'cheats' },
  { command: 'summon', description: 'Summons an entity.', syntax: ['summon <entityType: EntityType> [spawnPos: x y z] [spawnEvent: string] [nameTag: string]'], args: ['entity', 'position', 'string'], permission: 'cheats' },
  { command: 'tag', description: 'Manages entity tags.', syntax: ['tag <entity: target> add <name: string>', 'tag <entity: target> remove <name: string>', 'tag <entity: target> list'], args: ['target', 'string'], permission: 'cheats' },
  { command: 'teleport', description: 'Teleports entities.', syntax: ['teleport <destination: x y z>', 'teleport <victim: target> <destination: x y z>', 'teleport <victim: target> <destination: target>'], args: ['target', 'position'], permission: 'cheats', aliases: ['tp'] },
  { command: 'tell', description: 'Sends a private message.', syntax: ['tell <target: target> <message: message>'], args: ['target', 'message'], permission: 'normal', aliases: ['w'] },
  { command: 'tellraw', description: 'Sends a raw JSON message.', syntax: ['tellraw <target: target> <raw json message: json>'], args: ['target', 'json'], permission: 'cheats' },
  { command: 'testfor', description: 'Tests for entities.', syntax: ['testfor <victim: target>'], args: ['target'], permission: 'cheats' },
  { command: 'testforblock', description: 'Tests for a block.', syntax: ['testforblock <position: x y z> <tileName: Block> [dataValue: int]'], args: ['position', 'block'], permission: 'cheats' },
  { command: 'testforblocks', description: 'Tests whether two regions match.', syntax: ['testforblocks <begin: x y z> <end: x y z> <destination: x y z> [mode: MaskMode]'], args: ['position'], permission: 'cheats' },
  { command: 'tickingarea', description: 'Manages ticking areas.', syntax: ['tickingarea add <from: x y z> <to: x y z> [name: string] [preload: Boolean]', 'tickingarea add circle <center: x y z> <radius: int> [name: string] [preload: Boolean]', 'tickingarea remove <position: x y z>', 'tickingarea remove <name: string>', 'tickingarea remove_all', 'tickingarea list [all-dimensions]'], args: ['position', 'number', 'boolean', 'string'], permission: 'cheats' },
  { command: 'time', description: 'Changes or queries time.', syntax: ['time add <amount: int>', 'time query daytime', 'time query gametime', 'time query day', 'time set day', 'time set night', 'time set noon', 'time set midnight', 'time set <amount: int>'], args: ['time', 'number'], permission: 'cheats' },
  { command: 'title', description: 'Controls screen titles.', syntax: ['title <player: target> title <titleText: message>', 'title <player: target> subtitle <titleText: message>', 'title <player: target> actionbar <titleText: message>', 'title <player: target> clear', 'title <player: target> reset', 'title <player: target> times <fadeIn: int> <stay: int> <fadeOut: int>'], args: ['target', 'message', 'number'], permission: 'cheats' },
  { command: 'toggledownfall', description: 'Toggles weather.', syntax: ['toggledownfall'], args: [], permission: 'cheats' },
  { command: 'tp', description: 'Alias for teleport.', syntax: ['tp <destination: x y z>', 'tp <victim: target> <destination: x y z>', 'tp <victim: target> <destination: target>'], args: ['target', 'position'], permission: 'cheats', aliases: ['teleport'] },
  { command: 'transfer', description: 'Transfers a player to another server where supported.', syntax: ['transfer <player: target> <serverAddress: string> [port: int]'], args: ['target', 'string', 'number'], permission: 'server' },
  { command: 'volumearea', description: 'Manages volume areas where supported.', syntax: ['volumearea add <from: x y z> <to: x y z> <identifier: string> <name: string>', 'volumearea remove <name: string>', 'volumearea list'], args: ['position', 'string'], permission: 'cheats' },
  { command: 'weather', description: 'Sets weather.', syntax: ['weather clear [duration: int]', 'weather rain [duration: int]', 'weather thunder [duration: int]'], args: ['weather', 'number'], permission: 'cheats' },
  { command: 'worldbuilder', description: 'Toggles world builder status.', syntax: ['worldbuilder'], args: [], permission: 'cheats' },
  { command: 'xp', description: 'Adds or removes player experience.', syntax: ['xp <amount: int> [player: target]', 'xp <amount: int>L [player: target]'], args: ['target', 'number'], permission: 'cheats' },
];

const ENUM_SUGGESTIONS = {
  boolean: ['true', 'false'],
  target: ['@a', '@p', '@r', '@s', '@e', '<spielername>'],
  player: ['<spielername>', '@a', '@p', '@r'],
  difficulty: ['peaceful', 'easy', 'normal', 'hard'],
  gamemode: ['survival', 'creative', 'adventure', 'spectator'],
  weather: ['clear', 'rain', 'thunder'],
  time: ['day', 'night', 'noon', 'midnight'],
  allowlistAction: ['add', 'remove', 'list', 'reload', 'on', 'off'],
  number: ['0', '1', '10', '20', '100'],
  position: ['~ ~ ~', '~1 ~ ~', '0 64 0'],
  message: ['Hallo von WinoMC', 'Server startet neu', 'Bitte kurz speichern'],
  gamerule: [
    'keepinventory', 'showcoordinates', 'doinsomnia', 'mobgriefing', 'dodaylightcycle',
    'doweathercycle', 'doimmediaterespawn', 'dofiretick', 'domobspawning',
    'drowningdamage', 'falldamage', 'firedamage', 'pvp', 'randomtickspeed',
    'playerssleepingpercentage', 'spawnradius', 'tntexplodes', 'showdeathmessages',
  ],
};

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

function renderDashboard() {
  $('#managerSummary').textContent = `${state.instances.length} Instanz(en) · WinoMC Manager ${VERSION} · Autoerkennung PC/Mobile · alle Aktionen instanzbezogen`;

  $('#instancesGrid').innerHTML = state.instances.map((instance) => {
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
        <p class="eyebrow">${esc(instance.id)}</p>
        <h3>${esc(instance.name || instance.id)}</h3>
        <span class="status-pill">${esc(status)}</span>

        <dl class="facts">
          <div><dt>Profil</dt><dd>${esc(instance.profile || '-')}</dd></div>
          <div><dt>IPv4</dt><dd>${esc(b.server_port || '-')}</dd></div>
          <div><dt>IPv6</dt><dd>${esc(b.server_port_v6 || '-')}</dd></div>
          <div><dt>Start</dt><dd>${esc(instance.status?.started_at || '-')}</dd></div>
          <div><dt>Health</dt><dd>${esc(health.label)}</dd></div>
          <div><dt>Automation</dt><dd>${esc(automationView(instance))}</dd></div>
        </dl>

        ${!health.ok ? `<p class="warn-box">${esc(error || `Runtime-Status: ${status}`)}</p>` : ''}

        <div class="card-actions">
          <button type="button" data-action="start" data-id="${esc(instance.id)}">Start</button>
          <button type="button" data-action="stop" data-id="${esc(instance.id)}">Stop</button>
          <button type="button" data-action="restart" data-id="${esc(instance.id)}">Restart</button>
        </div>
      </article>
    `;
  }).join('') || '<p class="empty-state">Noch keine Instanzen. Öffne rechts „Neue Instanz“.</p>';
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
  const clean = value.trim().replace(/^\//, '').toLowerCase();

  if (!clean) {
    return COMMAND_CATALOG
      .filter((entry) => ['help', 'list', 'say', 'time', 'weather', 'gamerule', 'gamemode'].includes(entry.command))
      .map((entry) => ({ ...entry, type: 'command', insert: entry.syntax[0] }))
      .slice(0, 8);
  }

  const commandName = currentCommandName(value);
  const active = COMMAND_CATALOG.find((entry) => commandAliases(entry).includes(commandName));
  const enumMatches = active && value.replace(/^\//, '').includes(' ') ? enumSuggestionsForInput(value, active) : [];

  const commandMatches = COMMAND_CATALOG
    .map((entry) => {
      const aliases = commandAliases(entry);
      const haystack = [
        entry.command,
        ...(entry.aliases || []),
        entry.description,
        ...(entry.syntax || []),
      ].join(' ').toLowerCase();

      let score = 999;
      if (aliases.some((name) => name.startsWith(clean))) score = 0;
      else if (aliases.some((name) => clean.startsWith(name))) score = 1;
      else if (haystack.includes(clean)) score = 2;

      return { ...entry, score, type: 'command', insert: entry.syntax[0] };
    })
    .filter((entry) => entry.score < 999)
    .sort((a, b) => a.score - b.score || a.command.localeCompare(b.command))
    .slice(0, 10);

  return [...enumMatches, ...commandMatches].slice(0, 10);
}

function renderAutocomplete(input) {
  const box = $('#commandAutocomplete');
  if (!box) return;

  const suggestions = autocompleteSuggestions(input.value);

  if (!suggestions.length) {
    box.hidden = true;
    box.innerHTML = '';
    return;
  }

  box.hidden = false;
  box.innerHTML = suggestions.map((entry, index) => `
    <button type="button"
            class="autocomplete-item ${index === 0 ? 'active' : ''}"
            data-autocomplete-insert="${esc(entry.insert || entry.command)}">
      <span class="autocomplete-command">${esc(entry.command)}</span>
      <span class="autocomplete-description">${esc(entry.description || '')}</span>
      <code>${esc((entry.syntax || [entry.insert || entry.command])[0])}</code>
    </button>
  `).join('');
}

function applyAutocomplete(value) {
  const input = $('#commandForm input[name="command"]');
  if (!input) return;
  input.value = String(value || '').replace(/^\//, '');
  input.focus();
  renderAutocomplete(input);
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
    target.innerHTML = `
      <dl class="facts large">
        <div><dt>Status</dt><dd>${esc(inst.status?.state || '-')}</dd></div>
        <div><dt>Health</dt><dd>${esc(health.label)}</dd></div>
        <div><dt>Profil</dt><dd>${esc(inst.profile || '-')}</dd></div>
        <div><dt>IPv4</dt><dd>${esc(b.server_port || '-')}</dd></div>
        <div><dt>IPv6</dt><dd>${esc(b.server_port_v6 || '-')}</dd></div>
        <div><dt>Welt</dt><dd>${esc(b.level_name || '-')}</dd></div>
        <div><dt>Spielmodus</dt><dd>${esc(b.gamemode || '-')}</dd></div>
        <div><dt>Autostart</dt><dd>${a.autostart ? 'Aktiv' : 'Aus'}</dd></div>
        <div><dt>Watchdog</dt><dd>${a.watchdog ? 'Aktiv' : 'Aus'}</dd></div>
      </dl>
    `;
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
      const command = formEl.command.value.trim().replace(/^\//, '');

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
        <label class="checkbox-row">
          <input name="autostart" type="checkbox" ${a.autostart ? 'checked' : ''}>
          <span>Autostart beim Add-on-Start</span>
        </label>
        <label class="checkbox-row">
          <input name="watchdog" type="checkbox" ${a.watchdog ? 'checked' : ''}>
          <span>Watchdog: bei Crash automatisch neu starten</span>
        </label>
        <button type="submit" class="primary">Speichern</button>
      </form>
      <p class="hint">Watchdog startet nur nach Crash neu. Ein manueller Stop bleibt gestoppt.</p>
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

$('#refreshInstances').onclick = () => loadInstances().catch(showError);
$('#createDrawerToggle').onclick = () => toggleCreatePanel();

setAutoMode();
loadInstances().catch(showError);
