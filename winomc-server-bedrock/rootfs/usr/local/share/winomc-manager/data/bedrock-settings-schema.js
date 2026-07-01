window.WINOMC_BEDROCK_SETTINGS_SCHEMA = [
  {
    "key": "version",
    "property": null,
    "group": "Bedrock Runtime",
    "label": "Bedrock Version",
    "type": "text",
    "default": "LATEST",
    "description": "BDS-Version für diese Instanz. LATEST nutzt die aktuelle WinoMC-Runtime."
  },
  {
    "key": "server_name",
    "property": "server-name",
    "group": "Allgemein / Realm-nah",
    "label": "Servername",
    "type": "text",
    "default": "Dedicated Server",
    "description": "Name, der Spielern in Bedrock angezeigt wird."
  },
  {
    "key": "level_name",
    "property": "level-name",
    "group": "Allgemein / Realm-nah",
    "label": "Weltname",
    "type": "text",
    "default": "world",
    "description": "Ordnername der Welt."
  },
  {
    "key": "level_seed",
    "property": "level-seed",
    "group": "Allgemein / Realm-nah",
    "label": "Seed",
    "type": "text",
    "default": "",
    "description": "Seed für neue Welten. Bestehende Welten ändern dadurch nicht rückwirkend ihren Seed."
  },
  {
    "key": "level_type",
    "property": "level-type",
    "group": "Allgemein / Realm-nah",
    "label": "Level Type",
    "type": "select",
    "options": [
      "DEFAULT",
      "FLAT",
      "LEGACY"
    ],
    "default": "DEFAULT",
    "description": "Welt-Typ für neu erzeugte Welten."
  },
  {
    "key": "gamemode",
    "property": "gamemode",
    "group": "Allgemein / Realm-nah",
    "label": "Spielmodus",
    "type": "select",
    "options": [
      "survival",
      "creative",
      "adventure"
    ],
    "default": "survival"
  },
  {
    "key": "force_gamemode",
    "property": "force-gamemode",
    "group": "Allgemein / Realm-nah",
    "label": "Spielmodus erzwingen",
    "type": "boolean",
    "default": false
  },
  {
    "key": "difficulty",
    "property": "difficulty",
    "group": "Allgemein / Realm-nah",
    "label": "Schwierigkeit",
    "type": "select",
    "options": [
      "peaceful",
      "easy",
      "normal",
      "hard"
    ],
    "default": "easy"
  },
  {
    "key": "allow_cheats",
    "property": "allow-cheats",
    "group": "Allgemein / Realm-nah",
    "label": "Cheats erlauben",
    "type": "boolean",
    "default": false
  },
  {
    "key": "max_players",
    "property": "max-players",
    "group": "Zugang & Sicherheit",
    "label": "Maximale Spieler",
    "type": "number",
    "default": 10,
    "min": 1,
    "max": 100
  },
  {
    "key": "online_mode",
    "property": "online-mode",
    "group": "Zugang & Sicherheit",
    "label": "Online Mode / Xbox Auth",
    "type": "boolean",
    "default": true
  },
  {
    "key": "allowlist",
    "property": "allow-list",
    "group": "Zugang & Sicherheit",
    "label": "Allowlist aktivieren",
    "type": "boolean",
    "default": false
  },
  {
    "key": "default_player_permission_level",
    "property": "default-player-permission-level",
    "group": "Zugang & Sicherheit",
    "label": "Standard-Spielerrechte",
    "type": "select",
    "options": [
      "visitor",
      "member",
      "operator"
    ],
    "default": "member"
  },
  {
    "key": "chat_restriction",
    "property": "chat-restriction",
    "group": "Zugang & Sicherheit",
    "label": "Chat-Einschränkung",
    "type": "select",
    "options": [
      "None",
      "Dropped",
      "Disabled"
    ],
    "default": "None"
  },
  {
    "key": "disable_custom_skins",
    "property": "disable-custom-skins",
    "group": "Zugang & Sicherheit",
    "label": "Custom Skins deaktivieren",
    "type": "boolean",
    "default": false
  },
  {
    "key": "disable_player_interaction",
    "property": "disable-player-interaction",
    "group": "Zugang & Sicherheit",
    "label": "Spielerinteraktion deaktivieren",
    "type": "boolean",
    "default": false
  },
  {
    "key": "server_port",
    "property": "server-port",
    "group": "Netzwerk",
    "label": "IPv4-Port",
    "type": "number",
    "default": 19132,
    "min": 1,
    "max": 65535
  },
  {
    "key": "server_port_v6",
    "property": "server-portv6",
    "group": "Netzwerk",
    "label": "IPv6-Port",
    "type": "number",
    "default": 19133,
    "min": 1,
    "max": 65535
  },
  {
    "key": "enable_lan_visibility",
    "property": "enable-lan-visibility",
    "group": "Netzwerk",
    "label": "LAN-Sichtbarkeit",
    "type": "boolean",
    "default": true
  },
  {
    "key": "enable_v6bind_fix",
    "property": null,
    "group": "Netzwerk",
    "label": "WinoMC IPv6/V6Bind-Fix",
    "type": "boolean",
    "default": false,
    "description": "WinoMC-Runtime-Option für Dual-Stack-/IPv6-Bind-Probleme."
  },
  {
    "key": "compression_threshold",
    "property": "compression-threshold",
    "group": "Netzwerk",
    "label": "Compression Threshold",
    "type": "number",
    "default": 1,
    "min": 0,
    "max": 65535
  },
  {
    "key": "compression_algorithm",
    "property": "compression-algorithm",
    "group": "Netzwerk",
    "label": "Compression Algorithm",
    "type": "select",
    "options": [
      "zlib",
      "snappy"
    ],
    "default": "zlib"
  },
  {
    "key": "view_distance",
    "property": "view-distance",
    "group": "Performance",
    "label": "View Distance",
    "type": "number",
    "default": 32,
    "min": 5
  },
  {
    "key": "tick_distance",
    "property": "tick-distance",
    "group": "Performance",
    "label": "Tick Distance",
    "type": "number",
    "default": 4,
    "min": 4,
    "max": 12
  },
  {
    "key": "player_idle_timeout",
    "property": "player-idle-timeout",
    "group": "Performance",
    "label": "Idle Timeout Minuten",
    "type": "number",
    "default": 30,
    "min": 0
  },
  {
    "key": "max_threads",
    "property": "max-threads",
    "group": "Performance",
    "label": "Max Threads",
    "type": "number",
    "default": 8,
    "min": 0
  },
  {
    "key": "client_side_chunk_generation_enabled",
    "property": "client-side-chunk-generation-enabled",
    "group": "Performance",
    "label": "Client-side Chunk Generation",
    "type": "boolean",
    "default": true
  },
  {
    "key": "server_build_radius_ratio",
    "property": "server-build-radius-ratio",
    "group": "Performance",
    "label": "Server Build Radius Ratio",
    "type": "text",
    "default": "Disabled"
  },
  {
    "key": "texturepack_required",
    "property": "texturepack-required",
    "group": "Packs & Logging",
    "label": "Texturepack Required",
    "type": "boolean",
    "default": false
  },
  {
    "key": "content_log_file_enabled",
    "property": "content-log-file-enabled",
    "group": "Packs & Logging",
    "label": "Content Log File Enabled",
    "type": "boolean",
    "default": false
  },
  {
    "key": "emit_server_telemetry",
    "property": "emit-server-telemetry",
    "group": "Packs & Logging",
    "label": "Server-Telemetrie senden",
    "type": "boolean",
    "default": false
  },
  {
    "key": "block_network_ids_are_hashes",
    "property": "block-network-ids-are-hashes",
    "group": "Packs & Logging",
    "label": "Block Network IDs als Hashes",
    "type": "boolean",
    "default": true
  },
  {
    "key": "disable_client_vibrant_visuals",
    "property": "disable-client-vibrant-visuals",
    "group": "Packs & Logging",
    "label": "Client Vibrant Visuals deaktivieren",
    "type": "boolean",
    "default": true
  },
  {
    "key": "server_authoritative_movement",
    "property": "server-authoritative-movement",
    "group": "Server Authoritative / Movement",
    "label": "Authoritative Movement",
    "type": "select",
    "options": [
      "client-auth",
      "server-auth",
      "server-auth-with-rewind"
    ],
    "default": "server-auth"
  },
  {
    "key": "player_movement_score_threshold",
    "property": "player-movement-score-threshold",
    "group": "Server Authoritative / Movement",
    "label": "Movement Score Threshold",
    "type": "number",
    "default": 20,
    "min": 0
  },
  {
    "key": "player_movement_distance_threshold",
    "property": "player-movement-distance-threshold",
    "group": "Server Authoritative / Movement",
    "label": "Movement Distance Threshold",
    "type": "number",
    "default": 0.3,
    "step": 0.01
  },
  {
    "key": "player_movement_duration_threshold_in_ms",
    "property": "player-movement-duration-threshold-in-ms",
    "group": "Server Authoritative / Movement",
    "label": "Movement Duration Threshold ms",
    "type": "number",
    "default": 500,
    "min": 0
  },
  {
    "key": "correct_player_movement",
    "property": "correct-player-movement",
    "group": "Server Authoritative / Movement",
    "label": "Spielerbewegung korrigieren",
    "type": "boolean",
    "default": false
  },
  {
    "key": "server_authoritative_movement_strict",
    "property": "server-authoritative-movement-strict",
    "group": "Server Authoritative / Movement",
    "label": "Movement Strict",
    "type": "boolean",
    "default": false
  },
  {
    "key": "server_authoritative_dismount_strict",
    "property": "server-authoritative-dismount-strict",
    "group": "Server Authoritative / Movement",
    "label": "Dismount Strict",
    "type": "boolean",
    "default": false
  },
  {
    "key": "server_authoritative_entity_interactions_strict",
    "property": "server-authoritative-entity-interactions-strict",
    "group": "Server Authoritative / Movement",
    "label": "Entity Interactions Strict",
    "type": "boolean",
    "default": false
  },
  {
    "key": "player_position_acceptance_threshold",
    "property": "player-position-acceptance-threshold",
    "group": "Server Authoritative / Movement",
    "label": "Position Acceptance Threshold",
    "type": "number",
    "default": 0.5,
    "step": 0.01
  },
  {
    "key": "player_movement_action_direction_threshold",
    "property": "player-movement-action-direction-threshold",
    "group": "Server Authoritative / Movement",
    "label": "Movement Action Direction Threshold",
    "type": "number",
    "default": 0.85,
    "step": 0.01
  },
  {
    "key": "server_authoritative_block_breaking",
    "property": "server-authoritative-block-breaking",
    "group": "Server Authoritative / Movement",
    "label": "Block Breaking server-authoritative",
    "type": "boolean",
    "default": false
  },
  {
    "key": "server_authoritative_block_breaking_range_scalar",
    "property": "server-authoritative-block-breaking-range-scalar",
    "group": "Server Authoritative / Movement",
    "label": "Block Breaking Range Scalar",
    "type": "number",
    "default": 1.5,
    "step": 0.1
  },
  {
    "key": "server_authoritative_sound",
    "property": "server-authoritative-sound",
    "group": "Server Authoritative / Movement",
    "label": "Server Authoritative Sound",
    "type": "boolean",
    "default": false
  },
  {
    "key": "allow_outbound_script_debugging",
    "property": "allow-outbound-script-debugging",
    "group": "Script / Debug",
    "label": "Outbound Script Debugging",
    "type": "boolean",
    "default": false
  },
  {
    "key": "allow_inbound_script_debugging",
    "property": "allow-inbound-script-debugging",
    "group": "Script / Debug",
    "label": "Inbound Script Debugging",
    "type": "boolean",
    "default": false
  },
  {
    "key": "force_inbound_debug_port",
    "property": "force-inbound-debug-port",
    "group": "Script / Debug",
    "label": "Inbound Debug Port",
    "type": "number",
    "default": 19144,
    "min": 1,
    "max": 65535
  },
  {
    "key": "script_debugger_auto_attach",
    "property": "script-debugger-auto-attach",
    "group": "Script / Debug",
    "label": "Script Debugger Auto Attach",
    "type": "select",
    "options": [
      "disabled",
      "connect",
      "listen"
    ],
    "default": "disabled"
  },
  {
    "key": "script_debugger_auto_attach_connect_address",
    "property": "script-debugger-auto-attach-connect-address",
    "group": "Script / Debug",
    "label": "Debugger Connect Address",
    "type": "text",
    "default": "localhost:19144"
  },
  {
    "key": "script_debugger_auto_attach_timeout",
    "property": "script-debugger-auto-attach-timeout",
    "group": "Script / Debug",
    "label": "Debugger Attach Timeout",
    "type": "number",
    "default": 0,
    "min": 0
  },
  {
    "key": "script_debugger_passcode",
    "property": "script-debugger-passcode",
    "group": "Script / Debug",
    "label": "Debugger Passcode",
    "type": "text",
    "default": ""
  },
  {
    "key": "script_watchdog_enable",
    "property": "script-watchdog-enable",
    "group": "Script Watchdog",
    "label": "Script Watchdog aktiv",
    "type": "boolean",
    "default": true
  },
  {
    "key": "script_watchdog_enable_exception_handling",
    "property": "script-watchdog-enable-exception-handling",
    "group": "Script Watchdog",
    "label": "Exception Handling",
    "type": "boolean",
    "default": true
  },
  {
    "key": "script_watchdog_enable_shutdown",
    "property": "script-watchdog-enable-shutdown",
    "group": "Script Watchdog",
    "label": "Shutdown bei Watchdog",
    "type": "boolean",
    "default": true
  },
  {
    "key": "script_watchdog_hang_exception",
    "property": "script-watchdog-hang-exception",
    "group": "Script Watchdog",
    "label": "Hang Exception",
    "type": "boolean",
    "default": true
  },
  {
    "key": "script_watchdog_hang_threshold",
    "property": "script-watchdog-hang-threshold",
    "group": "Script Watchdog",
    "label": "Hang Threshold ms",
    "type": "number",
    "default": 10000
  },
  {
    "key": "script_watchdog_spike_threshold",
    "property": "script-watchdog-spike-threshold",
    "group": "Script Watchdog",
    "label": "Spike Threshold ms",
    "type": "number",
    "default": 100
  },
  {
    "key": "script_watchdog_slow_threshold",
    "property": "script-watchdog-slow-threshold",
    "group": "Script Watchdog",
    "label": "Slow Threshold ms",
    "type": "number",
    "default": 10
  },
  {
    "key": "script_watchdog_memory_warning",
    "property": "script-watchdog-memory-warning",
    "group": "Script Watchdog",
    "label": "Memory Warning MB",
    "type": "number",
    "default": 100
  },
  {
    "key": "script_watchdog_memory_limit",
    "property": "script-watchdog-memory-limit",
    "group": "Script Watchdog",
    "label": "Memory Limit MB",
    "type": "number",
    "default": 250
  },
  {
    "key": "diagnostics_capture_auto_start",
    "property": "diagnostics-capture-auto-start",
    "group": "Diagnostics",
    "label": "Diagnostics Auto Start",
    "type": "boolean",
    "default": false
  },
  {
    "key": "diagnostics_capture_max_files",
    "property": "diagnostics-capture-max-files",
    "group": "Diagnostics",
    "label": "Diagnostics Max Files",
    "type": "number",
    "default": 5
  },
  {
    "key": "diagnostics_capture_max_file_size",
    "property": "diagnostics-capture-max-file-size",
    "group": "Diagnostics",
    "label": "Diagnostics Max File Size",
    "type": "number",
    "default": 2097152
  }
];
