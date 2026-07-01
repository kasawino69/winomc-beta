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
config = root/'winomc-server-bedrock/config.yaml'
text = config.read_text()
if 'version: 2.1b' not in text:
    raise SystemExit('config.yaml version is not 2.1b')
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
import os, runpy, stat, tempfile, time, zipfile
smoke_root = pathlib.Path(tempfile.mkdtemp(prefix='winomc-manager-smoke-'))
shared = smoke_root/'.winomc'/'bds'/'shared'
shared.mkdir(parents=True)
fake_bds = shared/'bedrock_server'
fake_bds.write_text('#!/bin/sh\necho "Fake Bedrock ready"\nwhile IFS= read -r line; do echo "CMD:$line"; [ "$line" = "stop" ] && exit 0; done\n', encoding='utf-8')
fake_bds.chmod(fake_bds.stat().st_mode | stat.S_IXUSR)
os.environ['WINOMC_DATA_DIR'] = str(smoke_root)
os.environ['WINOMC_BDS_SHARED_DIR'] = str(shared)
module = runpy.run_path(str(server))
first = module['create_instance']({'id':'survival','name':'Survival','profile':'family-safe','bedrock':{'server_port':19132,'server_port_v6':19133}})
assert (smoke_root/'instances'/'survival'/'server.properties').read_text(encoding='utf-8').count('server-port=19132') == 1
try:
    module['create_instance']({'id':'creative','name':'Creative','profile':'creative','bedrock':{'server_port':19132,'server_port_v6':19134}})
    raise AssertionError('port conflict was not detected')
except ValueError as exc:
    assert 'Port 19132' in str(exc)
started = module['start_instance']('survival')
assert started['status']['state'] == 'running' and started['status']['pid']
assert (smoke_root/'instances'/'survival'/'runtime'/'state.json').exists()
module['send_instance_command']('survival', 'say smoke')
stopped = module['stop_instance']('survival')
assert stopped['status']['state'] in ('stopped', 'crashed')
backup = module['instance_backup']('survival')['backup']
with zipfile.ZipFile(backup['path']) as zf:
    assert 'backup-metadata.json' in zf.namelist()
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
    'def save_players', 'def prepare_update', 'def prepare_profile', 'winomc-mobile-assistant', 'def create_instance', 'def validate_instance_config', 'BEDROCK_PROFILES', 'INSTANCES_DIR', 'def detect_bds_runtime', 'def prepare_instance_runtime', 'PROCESS_HANDLES'
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
