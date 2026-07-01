
window.WinoMCAutocomplete = (() => {
  const enumSuggestions = {
    boolean: ['true', 'false'],
    target: ['@a', '@p', '@r', '@s', '@e', '<spielername>'],
    targets: ['@a', '@p', '@r', '@s', '@e', '<spielername>'],
    player: ['<spielername>', '@a', '@p', '@r'],
    difficulty: ['peaceful', 'easy', 'normal', 'hard'],
    gamemode: ['survival', 'creative', 'adventure', 'spectator'],
    weather: ['clear', 'rain', 'thunder'],
    time: ['day', 'night', 'noon', 'midnight'],
    allowlistAction: ['add', 'remove', 'list', 'reload', 'on', 'off'],
    saveAction: ['hold', 'query', 'resume'],
    number: ['0', '1', '4', '10', '20', '100'],
    position: ['~ ~ ~', '~1 ~ ~', '0 64 0'],
    message: ['Hallo von WinoMC', 'Server startet neu', 'Bitte kurz speichern'],
    cameraShakeType: ['positional', 'rotational'],
    cloneMode: ['normal', 'force', 'move'],
    maskMode: ['replace', 'masked'],
    fillMode: ['replace', 'destroy', 'hollow', 'keep', 'outline'],
    setBlockMode: ['replace', 'destroy', 'keep'],
    rotation: ['0_degrees', '90_degrees', '180_degrees', '270_degrees'],
    mirror: ['none', 'x', 'z', 'xz'],
  };

  function commandAliases(entry) {
    return [entry.command, ...(entry.aliases || [])].map((v) => String(v).toLowerCase());
  }

  function currentCommandName(value) {
    return String(value || '').trim().replace(/^\//, '').split(/\s+/)[0]?.toLowerCase() || '';
  }

  function buildSuggestions(value, commands, gamerules) {
    const clean = String(value || '').trim().replace(/^\//, '');
    const lower = clean.toLowerCase();
    const parts = clean.split(/\s+/);
    const commandName = currentCommandName(value);

    if (commandName === 'gamerule') {
      const ruleNeedle = (parts[1] || '').toLowerCase();
      const valueNeedle = (parts[2] || '').toLowerCase();

      if (parts.length <= 2 && !clean.endsWith(' ')) {
        return gamerules
          .filter((rule) => rule.name.toLowerCase().includes(ruleNeedle))
          .slice(0, 14)
          .map((rule) => ({
            type: 'gamerule',
            command: rule.name,
            description: `${rule.type} · ${rule.description}`,
            syntax: [`gamerule ${rule.name} ${rule.type === 'integer' ? '<zahl>' : rule.type === 'enum' ? '<wert>' : '<true|false>'}`],
            insert: `gamerule ${rule.name} `,
          }));
      }

      const rule = gamerules.find((item) => item.name.toLowerCase() === String(parts[1] || '').toLowerCase());
      if (rule) {
        const values = rule.values || (rule.type === 'boolean' ? ['true', 'false'] : ['0', '1', '10', '100']);
        return values
          .filter((item) => !valueNeedle || String(item).toLowerCase().includes(valueNeedle))
          .map((item) => ({
            type: 'gamerule-value',
            command: String(item),
            description: `${rule.name} Wert`,
            syntax: [`gamerule ${rule.name} ${item}`],
            insert: `gamerule ${rule.name} ${item}`,
          }));
      }
    }

    const active = commands.find((entry) => commandAliases(entry).includes(commandName));
    if (active && clean.includes(' ')) {
      const last = parts[parts.length - 1]?.toLowerCase() || '';
      const out = [];
      for (const arg of active.args || []) {
        for (const item of enumSuggestions[arg] || []) {
          if (!last || String(item).toLowerCase().includes(last)) {
            out.push({
              type: 'argument',
              command: item,
              description: `${arg}-Vorschlag für ${active.command}`,
              syntax: [item],
              insert: clean.endsWith(' ') ? `${clean}${item}` : `${parts.slice(0, -1).join(' ')} ${item}`,
            });
          }
        }
      }
      if (out.length) return out.slice(0, 12);
    }

    if (!lower) {
      return commands
        .filter((entry) => ['help', 'list', 'say', 'time', 'weather', 'gamerule', 'gamemode', 'allowlist', 'save'].includes(entry.command))
        .map((entry) => ({...entry, type: 'command', insert: entry.syntax?.[0] || entry.command}))
        .slice(0, 10);
    }

    return commands
      .map((entry) => {
        const aliases = commandAliases(entry);
        const haystack = [entry.command, ...(entry.aliases || []), entry.description, entry.category, ...(entry.syntax || [])].join(' ').toLowerCase();
        let score = 999;
        if (aliases.some((name) => name.startsWith(lower))) score = 0;
        else if (aliases.some((name) => lower.startsWith(name))) score = 1;
        else if (haystack.includes(lower)) score = 2;
        return {...entry, score, type: 'command', insert: entry.syntax?.[0] || entry.command};
      })
      .filter((entry) => entry.score < 999)
      .sort((a, b) => a.score - b.score || a.command.localeCompare(b.command))
      .slice(0, 14);
  }

  return { buildSuggestions };
})();
