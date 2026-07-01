#!/usr/bin/env sh
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
grep -q 'version: 2.1.7b' "${CONFIG}" || fail "config.yaml Version ist nicht 2.1.7b"
grep -q 'WINOMC_VERSION: "2.1.7b"' "${CONFIG}" || fail "WINOMC_VERSION ist nicht 2.1.7b"
grep -q 'WINOMC_MANAGER_PORT' "${CONFIG}" || fail "config.yaml enthält keinen WINOMC_MANAGER_PORT"

! grep -q 'winomc-native-start' "${ENTRYPOINT}" || fail "Entrypoint startet noch globale native Single-Server-Runtime"
! grep -q 'mkfifo' "${ENTRYPOINT}" || fail "Entrypoint erstellt noch globale Console-FIFO"
! grep -q 'run_stdin_bridge' "${ENTRYPOINT}" || fail "Entrypoint enthält noch globale STDIN-Bridge"
grep -q 'Manager-only boot' "${ENTRYPOINT}" || fail "Entrypoint kennzeichnet Manager-only Boot nicht"

grep -q 'WinoMC Manager 2.1.7b' "${MANAGER_DIR}/index.html" || fail "Manager index enthält keine sichtbare 2.1.7b Kennzeichnung"
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

echo "WinoMC 2.1.7b manager-only PC/Mobile validation OK"

# 2.1.7b markers
grep -q 'Watchdog' "${MANAGER_DIR}/manager.js" || fail "Watchdog UI fehlt"
grep -q 'Autostart' "${MANAGER_DIR}/manager.js" || fail "Autostart UI fehlt"
grep -q 'Auswählen' "${MANAGER_DIR}/manager.js" || fail "Auswählen Button fehlt"
