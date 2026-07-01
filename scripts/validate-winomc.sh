#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
python3 - <<'PY'
import json, pathlib, py_compile
try:
    import yaml
except Exception:
    yaml = None
root = pathlib.Path('.')
server = root/'winomc-server-bedrock/rootfs/usr/local/bin/winomc-console-server'
source = server.read_text()

manager_ui_dir = root/'winomc-server-bedrock/rootfs/usr/local/share/winomc-manager'
manager_index = manager_ui_dir/'index.html'
manager_js = manager_ui_dir/'manager.js'
for ui_file in [manager_index, manager_js, manager_ui_dir/'styles/base.css', manager_ui_dir/'styles/pc-classic.css', manager_ui_dir/'styles/mobile.css', manager_ui_dir/'styles/desktop.css']:
    if not ui_file.exists() or not ui_file.read_text(encoding='utf-8').strip():
        raise SystemExit(f'manager UI file missing or empty: {ui_file}')
ui_html = manager_index.read_text(encoding='utf-8')
ui_js = manager_js.read_text(encoding='utf-8')
for snippet in ['data-manager-app', 'instancesGrid', 'createInstanceForm', 'detailContent', 'errorPanel', 'mode-pc-classic', 'mode-mobile']:
    if snippet not in ui_html:
        raise SystemExit(f'manager UI missing required HTML marker: {snippet}')
for snippet in ['/api/instances', '/api/instances/${encodeURIComponent(id)}/start', '/api/instances/${encodeURIComponent(id)}/stop', '/api/instances/${encodeURIComponent(id)}/restart', '/api/instances/${encodeURIComponent(inst.id)}/console', '/api/instances/${encodeURIComponent(inst.id)}/command', '/api/instances/${encodeURIComponent(id)}/backup', 'showError', 'suggested_action']:
    if snippet not in ui_js:
        raise SystemExit(f'manager UI missing required API/UI snippet: {snippet}')
for forbidden in ['/api/command', '/api/status?start', '/api/start', '/api/stop', 'WINOMC_CONSOLE_FIFO']:
    if forbidden in ui_js:
        raise SystemExit(f'manager UI must not use old global single-server API: {forbidden}')
config = root/'winomc-server-bedrock/config.yaml'
text = config.read_text()
if 'version: 2.1.8b' not in text:
    raise SystemExit('config.yaml version is not 2.1.8b')
if yaml:
    yaml.safe_load(text)
else:
    assert 'schema:' in text and 'options:' in text
for path in root.rglob('*.json'):
    if '.git' in path.parts:
        continue
    json.loads(path.read_text())
py_compile.compile(str(server), doraise=True)

# WinoMC 2.1b manager/runtime smoke test with a fake Bedrock executable.
import os, runpy, stat, tempfile, time, zipfile, json
smoke_root = pathlib.Path(tempfile.mkdtemp(prefix='winomc-manager-smoke-'))
shared = smoke_root/'.winomc'/'bds'/'shared'
shared.mkdir(parents=True); (shared/'resource_packs'/'vanilla').mkdir(parents=True, exist_ok=True); (shared/'behavior_packs'/'vanilla').mkdir(parents=True, exist_ok=True)
fake_bds = shared/'bedrock_server'
fake_bds.write_text('#!/bin/sh\necho "Fake Bedrock ready $$"\nwhile IFS= read -r line; do echo "CMD:$line"; [ "$line" = "stop" ] && exit 0; done\n', encoding='utf-8')
fake_bds.chmod(fake_bds.stat().st_mode | stat.S_IXUSR)
os.environ['WINOMC_DATA_DIR'] = str(smoke_root)
os.environ['WINOMC_BDS_SHARED_DIR'] = str(shared)
module = runpy.run_path(str(server))
module['create_instance']({'id':'survival','name':'Survival','profile':'family-safe','bedrock':{'server_port':40132,'server_port_v6':40133}})
module['create_instance']({'id':'creative','name':'Creative','profile':'creative','bedrock':{'server_port':40142,'server_port_v6':40143}})
assert (smoke_root/'instances'/'survival'/'server.properties').read_text(encoding='utf-8').count('server-port=40132') == 1
try:
    module['create_instance']({'id':'conflict','name':'Conflict','profile':'creative','bedrock':{'server_port':40132,'server_port_v6':40144}})
    raise AssertionError('port conflict was not detected')
except ValueError as exc:
    assert 'Port 40132' in str(exc)
# missing and non-executable shared runtime validation must be structured.
original_candidates = module['BDS_CANDIDATE_DIRS']
module['validate_bds_runtime_or_raise'].__globals__['BDS_CANDIDATE_DIRS'] = [str(smoke_root/'missing-bds')]
try:
    module['validate_bds_runtime_or_raise']('survival')
    raise AssertionError('missing bedrock_server was not detected')
except module['WinoMCRuntimeError'] as exc:
    assert exc.code == 'bedrock_missing' and exc.to_payload()['component'] == 'shared-runtime'
module['validate_bds_runtime_or_raise'].__globals__['BDS_CANDIDATE_DIRS'] = [str(shared)]
fake_bds.chmod(fake_bds.stat().st_mode & ~stat.S_IXUSR)
try:
    module['validate_bds_runtime_or_raise']('survival')
    raise AssertionError('non-executable bedrock_server was not detected')
except module['WinoMCRuntimeError'] as exc:
    assert exc.code == 'bedrock_not_executable'
fake_bds.chmod(fake_bds.stat().st_mode | stat.S_IXUSR)
module['validate_bds_runtime_or_raise'].__globals__['BDS_CANDIDATE_DIRS'] = original_candidates
# stale PID reconciliation must not blindly trust the saved PID.
module['write_runtime_state']('survival', {'state':'running','pid':999999,'last_action':'start'})
reconciled = module['reconcile_instance_runtime']('survival')
assert reconciled['state'] == 'crashed' and reconciled['pid'] is None
started_survival = module['start_instance']('survival')
started_creative = module['start_instance']('creative')
assert started_survival['status']['state'] == 'running' and started_survival['status']['pid']
assert started_creative['status']['state'] == 'running' and started_creative['status']['pid']
assert started_survival['status']['pid'] != started_creative['status']['pid']
assert (smoke_root/'instances'/'survival'/'runtime'/'state.json').exists()
assert (smoke_root/'instances'/'creative'/'runtime'/'state.json').exists()
module['send_instance_command']('survival', 'say survival-only')
module['send_instance_command']('creative', 'say creative-only')
time.sleep(0.2)
survival_history = (smoke_root/'instances'/'survival'/'logs'/'commands.log').read_text(encoding='utf-8')
creative_history = (smoke_root/'instances'/'creative'/'logs'/'commands.log').read_text(encoding='utf-8')
assert 'survival-only' in survival_history and 'creative-only' not in survival_history
assert 'creative-only' in creative_history and 'survival-only' not in creative_history
stopped_survival = module['stop_instance']('survival')
assert stopped_survival['status']['state'] == 'stopped'
creative_after = module['runtime_status']('creative')
assert creative_after['state'] == 'running'
stopped_creative = module['stop_instance']('creative')
assert stopped_creative['status']['state'] == 'stopped'
backup = module['instance_backup']('survival')['backup']
with zipfile.ZipFile(backup['path']) as zf:
    metadata = json.loads(zf.read('backup-metadata.json').decode('utf-8'))
    assert metadata['instance_id'] == 'survival' and metadata['instance_name'] == 'Survival'
print('WinoMC manager runtime smoke OK')
required_symbols = [
    'def require_web_write_allowed', 'def read_web_protection_state', 'def set_web_protection_state',
    'WEB_PROTECTION_FILE', 'def repair_diagnostics', 'def validate_external_download_url',
    'def download_external_pack', 'def check_import_url', 'def install_import_url',
    'def atomic_write_json_root', 'def restore_backup', 'def build_restore_plan', 'def analyze_world_safety',
    'def build_repair_plan', 'def build_import_plan', 'def risk_level', 'def requires_confirmation',
    'def assert_plan_confirmed', 'QUARANTINE_DIR', 'def quarantine_file_path', 'manual_url_import_disabled_response',
    'def addons_overview_payload', 'def addons_catalog_payload', 'def build_addon_plan', 'def apply_addon_action',
    'def is_builtin_bedrock_pack', 'def is_system_pack_path',
    'def activate_pack', 'def deactivate_pack',
    'def save_players', 'def prepare_update', 'def prepare_profile', 'winomc-mobile-assistant', 'def create_instance', 'def validate_instance_config', 'BEDROCK_PROFILES', 'INSTANCES_DIR', 'def detect_bds_runtime', 'def prepare_instance_runtime', 'PROCESS_HANDLES', 'MANAGER_UI_DIR', 'def safe_manager_static_path'
]
for symbol in required_symbols:
    if symbol not in source:
        raise SystemExit(f'missing required backend/UI symbol: {symbol}')
if 'cookies.get("winomc_web_protection") == "1"' in source:
    raise SystemExit('web protection must not rely on cookie as source of truth')
required_routes = [
    '/api/web-protection', '/api/diagnostics/repair', '/api/import/status',
    '/api/import/url/check', '/api/import/url/install', '/api/backups/restore',
    '/api/backups/delete', '/api/backups/restore/plan', '/api/packs/activate', '/api/packs/deactivate',
    '/api/players/save', '/api/updates/prepare', '/api/profiles/prepare',
    '/api/manager', '/api/instances',
    '/api/addons/overview', '/api/addons/catalog', '/api/addons/item', '/api/addons/scan', '/api/addons/plan', '/api/addons/apply'
]
for route in required_routes:
    if route not in source:
        raise SystemExit(f'missing required API route: {route}')
protected_routes = [
    '/api/diagnostics/repair','/api/import/url/check','/api/import/url/install',
    '/api/backups/create','/api/backups/restore/plan','/api/backups/restore','/api/backups/delete','/api/packs/activate',
    '/api/packs/deactivate','/api/players/save','/api/updates/prepare','/api/profiles/prepare',
    '/api/files/upload','/api/files/upload-json','/api/files/write','/api/files/zip',
    '/api/files/unzip','/api/files/delete','/api/files/move','/api/files/trash/restore',
    '/api/files/trash/empty','/api/worlds/export-safe','/api/addons/apply'
]
for route in protected_routes:
    needle = 'if path.endswith("' + route + '")'
    idx = source.find(needle)
    if idx == -1:
        idx = source.find(route)
    if idx == -1:
        raise SystemExit(f'protected route missing: {route}')
    block = source[idx:idx+1400]
    if 'require_web_write_allowed' not in block:
        raise SystemExit(f'route is not guarded by web protection: {route}')
for snippet in ['.jar', 'Java-Mod', 'zip_member_is_symlink', 'duplicate_uuids', 'requires_confirmation', 'green', 'yellow', 'red', 'quarantine_file_path', 'build_import_plan_from_quarantine', 'local_update_available', 'installed_version', 'item_id', 'Importordner', 'BUILTIN_BEDROCK_PACK_NAMES', 'Packs & Add-ons', 'Expertenmodus aktivieren', 'Ich habe verstanden', 'Papierkorb', 'data-open-root="trash"']:
    if snippet not in source:
        raise SystemExit(f'URL import safety snippet missing: {snippet}')

for forbidden in ['urlopen', 'opener.open', 'Request(current', 'Request(info["url"]', 'source["path"]', 'HTTPRedirectHandler', 'build_opener', 'http.client.HTTPSConnection', 'requests.get']:
    if forbidden in source:
        raise SystemExit(f'CodeQL URL/path forbidden pattern remains: {forbidden}')
if 'data-panel="transfer"' in source and 'Import und Export findest du jetzt unter Packs & Add-ons' not in source:
    raise SystemExit('legacy Import/Export must clearly redirect to Packs & Add-ons')
if 'Freier serverseitiger URL-Download ist deaktiviert' not in source:
    raise SystemExit('free server-side URL download must be disabled')
if 'quarantine_file_path' not in source:
    raise SystemExit('quarantine path validation helper missing')
addon_readme = (root/'winomc-server-bedrock/README.md').read_text()
for snippet in ['URL-Import', 'CurseForge', 'Java-Mods', 'Mobile Befehlshilfe', 'serverseitig persistent', 'Safety Planner', 'Risikoampel', 'Quarantäne', 'Add-on Manager', 'kein Internet-Downloader', '/share/winomc/import', 'Packs & Add-ons']:
    if snippet not in addon_readme:
        raise SystemExit(f'add-on README missing required RC note: {snippet}')
changelog = (root/'winomc-server-bedrock/CHANGELOG.md').read_text()
for snippet in ['serverseitig persistenter Webschutz', 'Diagnose-Reparaturaktionen', 'URL-Import', 'Mobile Befehlshilfe', 'Safety Planner', 'Add-on Manager', 'freier URL-Download deaktiviert', 'Packs & Add-ons', 'Systempacks']:
    if snippet not in changelog:
        raise SystemExit(f'changelog missing RC note: {snippet}')
for doc in ['README.md','winomc-server-bedrock/README.md','winomc-server-bedrock/CHANGELOG.md']:
    if not (root/doc).read_text().strip():
        raise SystemExit(f'{doc} is empty')
print('WinoMC validation OK')
PY
bash -n winomc-server-bedrock/rootfs/usr/local/bin/winomc-bedrock-entrypoint
bash -n winomc-server-bedrock/rootfs/usr/local/bin/winomc-native-start

# 2.1.8b markers
grep -q 'Watchdog' "${MANAGER_DIR}/manager.js" || fail "Watchdog UI fehlt"
grep -q 'Autostart' "${MANAGER_DIR}/manager.js" || fail "Autostart UI fehlt"
grep -q 'data-instance-card' "${MANAGER_DIR}/manager.js" || fail "Klickbare Instanzkarten fehlen"

# 2.1.8b markers
grep -q 'COMMAND_CATALOG' "${MANAGER_DIR}/manager.js" || fail "Command Autocomplete Katalog fehlt"
grep -q 'autocompleteSuggestions' "${MANAGER_DIR}/manager.js" || fail "Command Autocomplete fehlt"
grep -q 'data-instance-card' "${MANAGER_DIR}/manager.js" || fail "Klickbare Instanzkarten fehlen"
grep -q 'WINOMC_LOG_LEVEL=debug' "${MANAGER_DIR}/manager.js" || fail "Debug-only Diagnose Hinweis fehlt"
