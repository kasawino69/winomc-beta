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
if 'version: 2.0.0' not in text:
    raise SystemExit('config.yaml version is not 2.0.0')
if yaml:
    yaml.safe_load(text)
else:
    assert 'schema:' in text and 'options:' in text
for path in root.rglob('*.json'):
    if '.git' in path.parts:
        continue
    json.loads(path.read_text())
py_compile.compile(str(server), doraise=True)
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
    'def save_players', 'def prepare_update', 'def prepare_profile', 'winomc-mobile-assistant'
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
