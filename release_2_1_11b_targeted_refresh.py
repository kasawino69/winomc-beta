#!/usr/bin/env python3
from __future__ import annotations

import argparse
import datetime as _dt
import re
import shutil
import subprocess
import sys
import traceback
from pathlib import Path


NEW_VERSION = "2.1.11b"
COMMIT_MESSAGE = "beta: release 2.1.11b targeted manager auto refresh"

TARGET_FILES = [
    "winomc-server-bedrock/config.yaml",
    "winomc-server-bedrock/CHANGELOG.md",
    "winomc-server-bedrock/rootfs/usr/local/share/winomc-manager/index.html",
    "winomc-server-bedrock/rootfs/usr/local/share/winomc-manager/manager.js",
]


def run(cmd: list[str], *, check: bool = True, capture: bool = False) -> subprocess.CompletedProcess[str]:
    result = subprocess.run(
        cmd,
        text=True,
        encoding="utf-8",
        errors="replace",
        stdout=subprocess.PIPE if capture else None,
        stderr=subprocess.STDOUT if capture else None,
    )

    if capture and result.stdout:
        print(result.stdout, end="")

    if check and result.returncode != 0:
        raise RuntimeError(f"Befehl fehlgeschlagen ({result.returncode}): {' '.join(cmd)}")

    return result


def git_text(args: list[str]) -> str:
    result = subprocess.run(
        ["git", *args],
        text=True,
        encoding="utf-8",
        errors="replace",
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    return result.stdout


def require_repo_root(root: Path) -> None:
    if not (root / ".git").exists():
        raise RuntimeError(f"Das ist kein Git-Repo: {root}")


def parse_git_status_paths() -> list[str]:
    output = git_text(["status", "--porcelain"])
    paths: list[str] = []

    for line in output.splitlines():
        if len(line) < 4:
            continue

        path = line[3:].strip()

        if " -> " in path:
            path = path.split(" -> ", 1)[1].strip()

        path = path.strip('"').replace("\\", "/")
        paths.append(path)

    return paths


def safety_restore_target_files(root: Path, script_rel: str | None) -> None:
    dirty_paths = parse_git_status_paths()

    if not dirty_paths:
        return

    allowed_extra = {
        script_rel,
    }

    target_dirty = [p for p in dirty_paths if p in TARGET_FILES]
    unexpected = [
        p for p in dirty_paths
        if p not in TARGET_FILES
        and p not in allowed_extra
        and not p.startswith("safety-diff-before-2.1.11b-")
    ]

    if unexpected:
        print("Arbeitsverzeichnis enthält unerwartete Änderungen:")
        for item in unexpected:
            print(f" - {item}")
        raise RuntimeError("Abbruch, damit keine fremden Änderungen überschrieben werden.")

    if not target_dirty:
        return

    stamp = _dt.datetime.now().strftime("%Y%m%d-%H%M%S")
    safety_patch = root / f"safety-diff-before-2.1.11b-{stamp}.patch"

    diff_worktree = git_text(["diff", "--", *TARGET_FILES])
    diff_staged = git_text(["diff", "--cached", "--", *TARGET_FILES])

    safety_patch.write_text(
        "# Safety diff before WinoMC 2.1.11b targeted refresh\n\n"
        "# --- staged diff ---\n"
        + diff_staged
        + "\n# --- worktree diff ---\n"
        + diff_worktree,
        encoding="utf-8",
        newline="\n",
    )

    print("Arbeitsverzeichnis war nicht sauber.")
    print(f"Sicherungsdiff erstellt: {safety_patch}")

    run(["git", "restore", "--staged", "--", *TARGET_FILES], check=False)
    run(["git", "restore", "--", *TARGET_FILES])

    print("Patch-Zieldateien wurden auf HEAD zurückgesetzt.")
    print()


def read(path: Path) -> str:
    if not path.exists():
        raise FileNotFoundError(path)
    return path.read_text(encoding="utf-8", errors="replace")


def write(path: Path, text: str) -> None:
    path.write_text(text, encoding="utf-8", newline="\n")


def sub_once(text: str, pattern: str, replacement, label: str, flags: int = 0) -> str:
    new_text, count = re.subn(pattern, replacement, text, count=1, flags=flags)

    if count != 1:
        raise RuntimeError(f"Marker nicht gefunden oder nicht eindeutig: {label}")

    return new_text


def update_config_versions_linewise(text: str, new_version: str) -> str:
    lines = text.splitlines(keepends=True)
    changed_version = 0
    changed_env_version = 0
    in_environment = False

    out: list[str] = []

    for line in lines:
        raw = line.rstrip("\r\n")
        newline = line[len(raw):]

        if raw.startswith("environment:"):
            in_environment = True
            out.append(line)
            continue

        if raw and not raw.startswith(" ") and not raw.startswith("\t") and not raw.startswith("environment:"):
            in_environment = False

        if raw.startswith("version:"):
            out.append(f"version: {new_version}{newline}")
            changed_version += 1
            continue

        if in_environment and raw.startswith("  WINOMC_VERSION:"):
            out.append(f'  WINOMC_VERSION: "{new_version}"{newline}')
            changed_env_version += 1
            continue

        out.append(line)

    if changed_version != 1:
        raise RuntimeError(f"config.yaml Guard: version wurde {changed_version}x geändert, erwartet 1x.")

    if changed_env_version != 1:
        raise RuntimeError(f"config.yaml Guard: WINOMC_VERSION wurde {changed_env_version}x geändert, erwartet 1x.")

    return "".join(out)


def normalize_config_versions_linewise(text: str) -> str:
    lines = text.splitlines(keepends=True)
    in_environment = False
    out: list[str] = []

    for line in lines:
        raw = line.rstrip("\r\n")
        newline = line[len(raw):]

        if raw.startswith("environment:"):
            in_environment = True
            out.append(line)
            continue

        if raw and not raw.startswith(" ") and not raw.startswith("\t") and not raw.startswith("environment:"):
            in_environment = False

        if raw.startswith("version:"):
            out.append(f"version: __VERSION__{newline}")
            continue

        if in_environment and raw.startswith("  WINOMC_VERSION:"):
            out.append(f'  WINOMC_VERSION: "__VERSION__"{newline}')
            continue

        out.append(line)

    return "".join(out)


def patch_config(root: Path) -> None:
    path = root / "winomc-server-bedrock/config.yaml"
    config = read(path)
    original = config

    required_markers = [
        'name: "[BETA] WinoMC Bedrock Server"',
        "description:",
        "version:",
        "slug: winomc-beta",
        "init: false",
        "boot: auto",
        "startup: services",
        "stdin: false",
        "arch:",
        "  - amd64",
        "  - aarch64",
        "host_network: true",
        "ingress: true",
        "ingress_port: 8099",
        "ingress_stream: true",
        "panel_icon: mdi:server-network",
        'panel_title: "[BETA] WinoMC Manager"',
        "panel_admin: true",
        "ports_description:",
        "options:",
        "schema:",
        "backup: cold",
        "backup_exclude:",
        "map:",
        "environment:",
        '  EULA: "TRUE"',
        '  WINOMC_CONSOLE_PORT: "8099"',
        '  WINOMC_MANAGER_UI_DIR: "/usr/local/share/winomc-manager"',
    ]

    for marker in required_markers:
        if marker not in config:
            raise RuntimeError(f"config.yaml Pflichtmarker fehlt vor Änderung: {marker}")

    config = update_config_versions_linewise(config, NEW_VERSION)

    for marker in required_markers:
        if marker not in config:
            raise RuntimeError(f"config.yaml Pflichtmarker fehlt nach Änderung: {marker}")

    if normalize_config_versions_linewise(original) != normalize_config_versions_linewise(config):
        raise RuntimeError(
            "config.yaml Guard: Es würden außer version/WINOMC_VERSION weitere Inhalte geändert."
        )

    write(path, config)


def patch_index(root: Path) -> None:
    path = root / "winomc-server-bedrock/rootfs/usr/local/share/winomc-manager/index.html"
    text = read(path)

    new_text, count = re.subn(
        r"WinoMC Manager\s+[0-9]+\.[0-9]+\.[0-9]+b",
        f"WinoMC Manager {NEW_VERSION}",
        text,
    )

    if count < 1 and f"WinoMC Manager {NEW_VERSION}" not in text:
        raise RuntimeError("index.html: Keine sichtbare Manager-Version gefunden.")

    write(path, new_text)


def patch_manager_js(root: Path) -> None:
    path = root / "winomc-server-bedrock/rootfs/usr/local/share/winomc-manager/manager.js"
    js = read(path)

    js = sub_once(
        js,
        r"const VERSION = '[^']+';",
        f"const VERSION = '{NEW_VERSION}';",
        "manager.js VERSION",
    )

    render_dashboard_block = r'''function renderInstanceCard(instance) {
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
}

function patchManagerSummary() {
  $('#managerSummary').textContent = `${state.instances.length} Instanz(en) · WinoMC Manager ${VERSION} · Auto-Refresh 10 s · gezielte Statusaktualisierung`;
  removeManualDashboardRefreshButtons();
}

function renderDashboard() {
  patchManagerSummary();

  const grid = $('#instancesGrid');
  if (!grid) return;

  grid.innerHTML = state.instances.map((instance) => renderInstanceCard(instance)).join('') ||
    '<p class="empty-state">Noch keine Instanzen. Öffne rechts „Neue Instanz“.</p>';
}
'''

    if "function renderInstanceCard(instance)" not in js:
        js, count = re.subn(
            r"function renderDashboard\(\) \{.*?\n\}\n\nasync function selectInstance",
            render_dashboard_block + "\nasync function selectInstance",
            js,
            count=1,
            flags=re.S,
        )
        if count != 1:
            raise RuntimeError("renderDashboard konnte nicht ersetzt werden.")

    overview_helper = r'''function renderOverviewFacts(inst) {
  const b = inst.bedrock || {};
  const a = inst.automation || {};
  const health = healthView(inst);

  return `
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
}

'''

    if "function renderOverviewFacts(inst)" not in js:
        if "async function renderDetail() {" not in js:
            raise RuntimeError("renderDetail nicht gefunden.")
        js = js.replace("async function renderDetail() {", overview_helper + "async function renderDetail() {", 1)

    if "target.innerHTML = renderOverviewFacts(inst);" not in js:
        js, count = re.subn(
            r"  if \(state\.tab === 'overview'\) \{\n    target\.innerHTML = `.*?`;\n  \} else if \(state\.tab === 'console'\) \{",
            "  if (state.tab === 'overview') {\n    target.innerHTML = renderOverviewFacts(inst);\n  } else if (state.tab === 'console') {",
            js,
            count=1,
            flags=re.S,
        )
        if count != 1:
            raise RuntimeError("Overview-Render konnte nicht ersetzt werden.")

    targeted_refresh_block = r'''async function patchConsoleLog(instanceId) {
  const log = $('#consoleLog');
  if (!log || !instanceId) return;

  const wasAtBottom = (log.scrollHeight - log.scrollTop - log.clientHeight) < 24;
  const consoleData = await get(`/api/instances/${encodeURIComponent(instanceId)}/console`);
  const lines = consoleData.lines || consoleData.console || consoleData.logs || [];
  const nextText = Array.isArray(lines) ? lines.join('\n') : String(lines || 'Noch keine Logzeilen für diese Instanz.');

  if (log.textContent !== nextText) {
    log.textContent = nextText;
    if (wasAtBottom) {
      log.scrollTop = log.scrollHeight;
    }
  }
}

function patchDashboardCards(instances) {
  const grid = $('#instancesGrid');
  if (!grid) return;

  if (!instances.length) {
    grid.innerHTML = '<p class="empty-state">Noch keine Instanzen. Öffne rechts „Neue Instanz“.</p>';
    return;
  }

  const seen = new Set();

  for (const instance of instances) {
    const current = [...grid.querySelectorAll('[data-instance-card]')]
      .find((card) => card.dataset.instanceCard === instance.id);

    const html = renderInstanceCard(instance);

    if (current) {
      current.outerHTML = html;
    } else {
      grid.insertAdjacentHTML('beforeend', html);
    }

    seen.add(instance.id);
  }

  for (const card of [...grid.querySelectorAll('[data-instance-card]')]) {
    if (!seen.has(card.dataset.instanceCard)) {
      card.remove();
    }
  }
}

async function patchSelectedRuntimeObjects(instanceSummary) {
  if (!state.selectedId || !instanceSummary || instanceSummary.id !== state.selectedId) return;

  state.selected = {
    ...(state.selected || {}),
    ...instanceSummary,
    bedrock: {
      ...((state.selected || {}).bedrock || {}),
      ...(instanceSummary.bedrock || {}),
    },
    automation: {
      ...((state.selected || {}).automation || {}),
      ...(instanceSummary.automation || {}),
    },
    status: instanceSummary.status || (state.selected || {}).status,
    health: instanceSummary.health || (state.selected || {}).health,
  };

  const title = $('#detailTitle');
  if (title) {
    title.textContent = `${state.selected.name || state.selectedId} (${state.selectedId})`;
  }

  if (state.tab === 'overview') {
    const target = $('#detailContent');
    if (target) {
      target.innerHTML = renderOverviewFacts(state.selected);
    }
    return;
  }

  if (state.tab === 'console') {
    await patchConsoleLog(state.selectedId);
    return;
  }

  if (state.tab === 'diagnostics' && state.logLevel === 'debug') {
    const pre = $('#detailContent pre');
    if (pre) {
      pre.textContent = JSON.stringify(state.selected.status || state.selected, null, 2);
    }
  }
}

async function refreshRuntimeObjectsOnly() {
  const selectedId = state.selectedId;
  const data = await get('/api/instances');

  state.instances = sortInstances(data.instances || []);
  state.profiles = data.profiles || state.profiles || [];
  state.logLevel = String(data.manager?.log_level || data.log_level || state.logLevel || 'info').toLowerCase();

  patchManagerSummary();
  patchDashboardCards(state.instances);
  updateDiagnosticsVisibility();

  const selectedSummary = state.instances.find((instance) => instance.id === selectedId);
  if (selectedSummary) {
    await patchSelectedRuntimeObjects(selectedSummary);
  }
}

async function autoRefreshTick(force = false) {
  if (state.autoRefreshBusy) return;
  if (!force && document.hidden) return;

  state.autoRefreshBusy = true;

  try {
    await refreshRuntimeObjectsOnly();
    state.lastAutoRefreshAt = new Date().toISOString();
  } catch (err) {
    console.warn('[WinoMC] Auto-Refresh fehlgeschlagen', err);
  } finally {
    state.autoRefreshBusy = false;
  }
}
'''

    if "async function refreshRuntimeObjectsOnly()" not in js:
        js, count = re.subn(
            r"async function autoRefreshTick\(force = false\) \{.*?\n\}\n\nfunction startAutoRefresh",
            targeted_refresh_block + "\nfunction startAutoRefresh",
            js,
            count=1,
            flags=re.S,
        )
        if count != 1:
            raise RuntimeError("autoRefreshTick konnte nicht ersetzt werden.")

    auto_refresh_section = re.search(
        r"async function autoRefreshTick\(force = false\) \{.*?\n\}",
        js,
        flags=re.S,
    )
    if not auto_refresh_section:
        raise RuntimeError("autoRefreshTick nicht gefunden.")

    for forbidden in ["loadInstances(", "selectInstance(", "renderDetail("]:
        if forbidden in auto_refresh_section.group(0):
            raise RuntimeError(f"Guard: autoRefreshTick enthält weiterhin verbotenen Aufruf: {forbidden}")

    if "if (state.tab === 'console') {\n    await patchConsoleLog(state.selectedId);" not in js:
        raise RuntimeError("Guard: Console wird nicht gezielt aktualisiert.")

    write(path, js)


def patch_changelog(root: Path) -> None:
    path = root / "winomc-server-bedrock/CHANGELOG.md"
    text = read(path)

    entry = f"""## {NEW_VERSION} - Targeted Auto-Refresh

- Reworks Manager auto-refresh to update only targeted runtime objects instead of re-rendering full tabs.
- Dashboard cards now refresh status, health, ports, runtime start and automation display without touching forms.
- Selected overview updates only its facts block.
- Console auto-refresh updates only `#consoleLog`; `#commandForm`, command input and autocomplete remain untouched.
- Settings, Files and Editor areas are no longer rebuilt by background refresh cycles.
- Keeps `config.yaml` changes strictly limited to `version` and `environment.WINOMC_VERSION`.

"""

    if f"## {NEW_VERSION} " not in text:
        text = entry + text

    write(path, text)


def validate(root: Path) -> None:
    node = shutil.which("node")
    if node:
        print("Syntaxcheck manager.js mit Node...")
        run([node, "--check", "winomc-server-bedrock/rootfs/usr/local/share/winomc-manager/manager.js"])
    else:
        print("Node nicht gefunden, JS-Syntaxcheck wird übersprungen.")

    print()
    print("git diff --check...")
    result = run(["git", "-c", "core.autocrlf=false", "diff", "--check"], check=False, capture=True)
    if result.returncode != 0:
        raise RuntimeError("git diff --check meldet echte Fehler.")


def print_diffs() -> None:
    print()
    print("WICHTIG: config.yaml Diff, darf nur version und WINOMC_VERSION zeigen:")
    run(["git", "--no-pager", "diff", "--", "winomc-server-bedrock/config.yaml"], check=False)

    print()
    print("manager.js Diff:")
    run(["git", "--no-pager", "diff", "--", "winomc-server-bedrock/rootfs/usr/local/share/winomc-manager/manager.js"], check=False)

    print()
    print("index.html Diff:")
    run(["git", "--no-pager", "diff", "--", "winomc-server-bedrock/rootfs/usr/local/share/winomc-manager/index.html"], check=False)

    print()
    print("CHANGELOG Diff:")
    run(["git", "--no-pager", "diff", "--", "winomc-server-bedrock/CHANGELOG.md"], check=False)

    print()
    print("Geänderte Dateien:")
    run(["git", "status", "--short"], check=False)


def commit_and_push() -> None:
    run(["git", "add", *TARGET_FILES])
    run(["git", "commit", "-m", COMMIT_MESSAGE])
    run(["git", "push", "origin", "main"])


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--push", action="store_true", help="Nach erfolgreicher Prüfung direkt committen und pushen.")
    parser.add_argument("--no-pull", action="store_true", help="git pull --rebase überspringen.")
    args = parser.parse_args()

    root = Path.cwd()
    require_repo_root(root)

    script_rel: str | None = None
    try:
        script_rel = Path(__file__).resolve().relative_to(root.resolve()).as_posix()
    except Exception:
        script_rel = None

    print(f"Repo: {root}")
    print()

    safety_restore_target_files(root, script_rel)

    if not args.no_pull:
        run(["git", "pull", "--rebase"])

    patch_config(root)
    patch_index(root)
    patch_manager_js(root)
    patch_changelog(root)

    print()
    print(f"WinoMC beta {NEW_VERSION} targeted auto-refresh patch angewendet.")
    print()

    validate(root)
    print_diffs()

    if not git_text(["status", "--porcelain"]).strip():
        print("Keine Änderungen vorhanden.")
        return 0

    if not args.push:
        print()
        print("Patch ist angewendet, aber noch NICHT committed/gepusht.")
        print("Prüfe den Diff oben.")
        confirm = input('Wenn alles passt, tippe exakt "PUSH": ').strip()
        if confirm != "PUSH":
            print("Abgebrochen ohne Commit/Push.")
            return 0

    commit_and_push()

    print()
    print(f"Fertig: {NEW_VERSION} wurde committed und nach origin/main gepusht.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception:
        print()
        print("FEHLER:")
        traceback.print_exc()
        raise SystemExit(1)