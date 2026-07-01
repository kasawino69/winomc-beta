/* WinoMC PC UI 1.6.14.23b
   PC-only behaviour. Shared modules remain the existing API/file/console functions. */
(function WinoMCPCUI() {
  if (window.WinoMCPCUI?.initialized) return;

  const PC = { initialized: true };
  const byId = (id) => document.getElementById(id);

  let originalEditorParent = null;
  let originalEditorNext = null;
  let pcLayer = null;

  function hasFinePointer() {
    try {
      return Boolean(window.matchMedia && window.matchMedia('(pointer: fine)').matches);
    } catch (_) {
      return false;
    }
  }

  PC.isActive = function isActive() {
    const fine = hasFinePointer();
    const touchOnly = navigator.maxTouchPoints > 0 && !fine;
    return fine || (!touchOnly && window.innerWidth >= 720);
  };

  PC.syncShell = function syncShell() {
    const active = PC.isActive();
    document.body.classList.toggle('winomc-pc', active);
    document.body.classList.toggle('winomc-mobile', !active);
    return active;
  };

  function ensurePcLayer() {
    if (pcLayer && document.body.contains(pcLayer)) return pcLayer;
    pcLayer = document.getElementById('winomcPcLayer');
    if (!pcLayer) {
      pcLayer = document.createElement('div');
      pcLayer.id = 'winomcPcLayer';
      pcLayer.setAttribute('aria-hidden', 'false');
      document.body.appendChild(pcLayer);
    }
    return pcLayer;
  }

  function rememberEditorHome(panel) {
    if (!panel || originalEditorParent) return;
    originalEditorParent = panel.parentNode;
    originalEditorNext = panel.nextSibling;
  }

  function moveEditorToPcLayer() {
    const panel = byId('editorPanel');
    if (!panel) return null;
    rememberEditorHome(panel);
    const layer = ensurePcLayer();
    if (panel.parentNode !== layer) layer.appendChild(panel);
    return panel;
  }

  PC.restoreEditorHome = function restoreEditorHome() {
    const panel = byId('editorPanel');
    if (!panel || !originalEditorParent || panel.parentNode === originalEditorParent) return;
    try {
      if (originalEditorNext && originalEditorNext.parentNode === originalEditorParent) {
        originalEditorParent.insertBefore(panel, originalEditorNext);
      } else {
        originalEditorParent.appendChild(panel);
      }
    } catch (_) {
      originalEditorParent.appendChild(panel);
    }
    panel.classList.remove('winomc-pc-editor');
  };

  PC.clearBlockers = function clearBlockers() {
    document.body.classList.remove('editor-modal-open', 'has-maximized-card');
    document.querySelectorAll('.card.maximized').forEach((card) => card.classList.remove('maximized'));
    document.querySelectorAll('.editor-modal-backdrop, .modal-backdrop').forEach((backdrop) => {
      backdrop.setAttribute('aria-hidden', 'true');
      backdrop.style.display = 'none';
      backdrop.style.visibility = 'hidden';
      backdrop.style.pointerEvents = 'none';
      backdrop.style.opacity = '0';
      backdrop.style.background = 'transparent';
      backdrop.style.backdropFilter = 'none';
    });
  };

  function setCompactEditorActions(panel) {
    const actions = panel?.querySelector(':scope > .editor-actions');
    if (!actions) return;
    actions.style.display = 'flex';
    actions.style.flexDirection = 'row';
    actions.style.flexWrap = 'wrap';
    actions.style.alignItems = 'center';
    actions.style.justifyContent = 'flex-start';
    actions.style.gap = '8px';
    actions.style.flex = '0 0 auto';
    actions.querySelectorAll('button').forEach((button) => {
      button.style.width = 'auto';
      button.style.minWidth = '0';
      button.style.maxWidth = 'none';
      button.style.flex = '0 0 auto';
    });
  }

  function setEditorStaticHeader(panel) {
    panel?.querySelectorAll(':scope > .card-header, :scope > .file-path, :scope > .file-meta, :scope > .readonly-note, :scope > .info').forEach((el) => {
      el.style.flex = '0 0 auto';
      el.style.position = 'static';
      el.style.inset = 'auto';
      el.style.transform = 'none';
    });
  }

  function setEditorTextarea() {
    const editor = byId('fileEditor');
    if (!editor) return;
    editor.style.flex = '1 1 auto';
    editor.style.width = '100%';
    editor.style.height = 'auto';
    editor.style.minHeight = '0';
    editor.style.maxHeight = 'none';
    editor.style.display = 'block';
    editor.style.resize = 'none';
    editor.style.overflow = 'auto';
  }

  PC.openEditor = function openEditor({ fullscreen = false } = {}) {
    if (!PC.syncShell()) return false;
    const panel = moveEditorToPcLayer();
    if (!panel) return false;

    PC.clearBlockers();
    panel.classList.add('editor-open', 'winomc-pc-editor');
    panel.classList.toggle('editor-fullscreen', Boolean(fullscreen));
    document.body.classList.add('winomc-pc-editor-open');
    document.body.classList.toggle('winomc-pc-editor-fullscreen', Boolean(fullscreen));

    const grid = byId('fileManagerGrid');
    if (grid) grid.classList.remove('editor-visible');

    const fullscreenButton = byId('editorFullscreen');
    if (fullscreenButton) fullscreenButton.textContent = fullscreen ? 'Normal' : 'Vollbild';
    const closeButton = byId('fileCloseEditor');
    if (closeButton) closeButton.textContent = 'Schließen';

    setCompactEditorActions(panel);
    setEditorStaticHeader(panel);
    setEditorTextarea();

    window.requestAnimationFrame(() => byId('fileEditor')?.focus({ preventScroll: true }));
    return true;
  };

  PC.closeEditor = function closeEditor() {
    const panel = byId('editorPanel');
    if (!panel) return;
    panel.classList.remove('editor-open', 'editor-fullscreen', 'winomc-pc-editor');
    document.body.classList.remove('winomc-pc-editor-open', 'winomc-pc-editor-fullscreen', 'editor-modal-open');
    const fullscreenButton = byId('editorFullscreen');
    if (fullscreenButton) fullscreenButton.textContent = 'Vollbild';
    PC.clearBlockers();
  };

  PC.toggleFullscreen = function toggleFullscreen() {
    const panel = byId('editorPanel');
    if (!panel) return;
    PC.openEditor({ fullscreen: !panel.classList.contains('editor-fullscreen') });
  };

  PC.repairDesktopFiles = function repairDesktopFiles() {
    if (!PC.syncShell() || !document.body.classList.contains('desktop-mode')) return;
    const panel = document.querySelector('.tab-panel[data-panel="files"]');
    if (!panel || !panel.classList.contains('desktop-open') || panel.classList.contains('desktop-minimized')) return;

    panel.style.left = '12px';
    panel.style.top = '12px';
    panel.style.width = 'calc(100dvw - 24px)';
    panel.style.height = 'calc(100dvh - 72px)';
    panel.style.display = 'grid';
    panel.style.gridTemplateRows = 'auto minmax(0, 1fr)';
    panel.style.overflow = 'hidden';
    panel.style.resize = 'none';

    const grid = byId('fileManagerGrid');
    if (grid) {
      grid.classList.remove('editor-visible');
      grid.style.display = 'grid';
      grid.style.gridTemplateColumns = 'minmax(0, 1fr)';
      grid.style.gridTemplateRows = 'minmax(0, 1fr)';
      grid.style.height = '100%';
      grid.style.minHeight = '0';
      grid.style.maxHeight = '100%';
      grid.style.overflow = 'hidden';
    }

    const split = byId('filesSplitHandle');
    if (split) split.style.display = 'none';

    const explorer = panel.querySelector('.file-explorer-panel');
    if (explorer) {
      explorer.style.display = 'flex';
      explorer.style.flexDirection = 'column';
      explorer.style.height = '100%';
      explorer.style.minHeight = '0';
      explorer.style.maxHeight = '100%';
      explorer.style.overflow = 'hidden';
    }

    const tableWrap = panel.querySelector('.file-table-wrap');
    if (tableWrap) {
      tableWrap.style.flex = '1 1 auto';
      tableWrap.style.minHeight = '360px';
      tableWrap.style.height = 'auto';
      tableWrap.style.maxHeight = 'none';
      tableWrap.style.overflow = 'auto';
      tableWrap.style.paddingBottom = '24px';
    }
  };

  PC.repairClassicFiles = function repairClassicFiles() {
    if (!PC.syncShell() || document.body.classList.contains('desktop-mode')) return;
    const filesPanel = document.querySelector('.tab-panel[data-panel="files"]');
    const active = filesPanel?.classList.contains('active');

    const grid = byId('fileManagerGrid');
    const split = byId('filesSplitHandle');
    const explorer = filesPanel?.querySelector('.file-explorer-panel');
    const tableWrap = filesPanel?.querySelector('.file-table-wrap');

    if (!active) {
      if (filesPanel) filesPanel.style.display = 'none';
      if (grid) {
        grid.classList.remove('editor-visible');
        grid.style.display = 'none';
      }
      if (explorer) explorer.style.display = 'none';
      if (tableWrap) tableWrap.style.display = 'none';
      return;
    }

    filesPanel.style.display = 'flex';
    filesPanel.style.flexDirection = 'column';
    filesPanel.style.height = '100%';
    filesPanel.style.minHeight = '0';
    filesPanel.style.overflow = 'hidden';

    if (grid) {
      grid.classList.remove('editor-visible');
      grid.style.display = 'grid';
      grid.style.flex = '1 1 auto';
      grid.style.gridTemplateColumns = 'minmax(0, 1fr)';
      grid.style.gridTemplateRows = 'minmax(0, 1fr)';
      grid.style.height = 'auto';
      grid.style.minHeight = '0';
      grid.style.maxHeight = 'none';
      grid.style.overflow = 'hidden';
    }

    if (split) split.style.display = 'none';

    if (explorer) {
      explorer.style.display = 'flex';
      explorer.style.flexDirection = 'column';
      explorer.style.height = '100%';
      explorer.style.minHeight = '0';
      explorer.style.maxHeight = '100%';
      explorer.style.overflow = 'hidden';
    }

    if (tableWrap) {
      tableWrap.style.display = '';
      tableWrap.style.flex = '1 1 auto';
      tableWrap.style.height = 'auto';
      tableWrap.style.minHeight = '0';
      tableWrap.style.maxHeight = 'none';
      tableWrap.style.overflow = 'auto';
      tableWrap.style.overscrollBehavior = 'contain';
    }
  };

  PC.tick = function tick() {
    if (!PC.syncShell()) {
      PC.restoreEditorHome();
      return;
    }
    const panel = byId('editorPanel');
    if (panel?.classList.contains('editor-open')) {
      PC.openEditor({ fullscreen: panel.classList.contains('editor-fullscreen') });
    }
    PC.repairClassicFiles();
    PC.repairDesktopFiles();
  };

  window.WinoMCPCUI = PC;
})();
