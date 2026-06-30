#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
python3 - <<'PY'
import json, pathlib, py_compile, sys
try:
    import yaml
except Exception:
    yaml = None
root = pathlib.Path('.')
config = root/'winomc-server-bedrock/config.yaml'
text = config.read_text()
if 'version: 2.0.0' not in text:
    raise SystemExit('config.yaml version is not 2.0.0')
if yaml:
    yaml.safe_load(text)
else:
    # minimal fallback: ensure key lines exist
    assert 'schema:' in text and 'options:' in text
for path in root.rglob('*.json'):
    if '.git' in path.parts:
        continue
    json.loads(path.read_text())
py_compile.compile(str(root/'winomc-server-bedrock/rootfs/usr/local/bin/winomc-console-server'), doraise=True)
for doc in ['README.md','winomc-server-bedrock/README.md','winomc-server-bedrock/CHANGELOG.md']:
    if not (root/doc).read_text().strip():
        raise SystemExit(f'{doc} is empty')
print('WinoMC validation OK')
PY
bash -n winomc-server-bedrock/rootfs/usr/local/bin/winomc-bedrock-entrypoint
bash -n winomc-server-bedrock/rootfs/usr/local/bin/winomc-native-start
