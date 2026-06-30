#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
python3 - <<'PY'
import json, pathlib, py_compile, re, sys
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
    'def require_web_write_allowed',
    'def atomic_write_json_root',
    'def restore_backup',
    'def activate_pack',
    'def deactivate_pack',
    'def save_players',
    'def prepare_update',
    'def prepare_profile',
]
for symbol in required_symbols:
    if symbol not in source:
        raise SystemExit(f'missing required backend symbol: {symbol}')
required_routes = [
    '/api/backups/restore', '/api/backups/delete', '/api/packs/activate',
    '/api/packs/deactivate', '/api/players/save', '/api/updates/prepare',
    '/api/profiles/prepare'
]
for route in required_routes:
    if route not in source:
        raise SystemExit(f'missing required API route: {route}')
protected_routes = [
    '/api/backups/create','/api/backups/restore','/api/backups/delete','/api/packs/activate',
    '/api/packs/deactivate','/api/players/save','/api/updates/prepare','/api/profiles/prepare',
    '/api/files/upload','/api/files/upload-json','/api/files/write','/api/files/zip',
    '/api/files/unzip','/api/files/delete','/api/files/move','/api/files/trash/restore',
    '/api/files/trash/settings','/api/files/trash/empty','/api/worlds/export-safe'
]
for route in protected_routes:
    needle = 'if path.endswith(\"' + route + '\")'
    idx = source.find(needle)
    if idx == -1:
        idx = source.find(route)
    if idx == -1:
        raise SystemExit(f'protected route missing: {route}')
    block = source[idx:idx+1200]
    if 'require_web_write_allowed' not in block:
        raise SystemExit(f'route is not guarded by web protection: {route}')
readme = (root/'winomc-server-bedrock/README.md').read_text()
if 'Profil-Empfehlung' not in readme and 'Profile' in readme:
    raise SystemExit('README must describe profiles as prepared recommendations, not fake applied settings')
if 'keinen riskanten Live-Update-Fake' not in readme:
    raise SystemExit('README must honestly describe update prepare workflow')
for doc in ['README.md','winomc-server-bedrock/README.md','winomc-server-bedrock/CHANGELOG.md']:
    if not (root/doc).read_text().strip():
        raise SystemExit(f'{doc} is empty')
print('WinoMC validation OK')
PY
bash -n winomc-server-bedrock/rootfs/usr/local/bin/winomc-bedrock-entrypoint
bash -n winomc-server-bedrock/rootfs/usr/local/bin/winomc-native-start
