window.WINOMC_BEDROCK_COMMANDS = [
  {
    "command": "aimassist",
    "description": "Enable Aim Assist.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "aimassist <player: target> set <x: value> <y: value>",
      "aimassist <player: target> clear"
    ],
    "args": [
      "target",
      "number"
    ],
    "category": "Player"
  },
  {
    "command": "ability",
    "description": "Legacy/Education ability command.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "legacy": true,
    "syntax": [
      "ability <player: target> <ability: Ability> <value: Boolean>"
    ],
    "args": [
      "target",
      "ability",
      "boolean"
    ],
    "category": "Legacy"
  },
  {
    "command": "allowlist",
    "description": "Manages the dedicated server allowlist.",
    "permission": "Owner",
    "requiresCheats": true,
    "dedicatedServerOnly": true,
    "syntax": [
      "allowlist add <name: string>",
      "allowlist remove <name: string>",
      "allowlist list",
      "allowlist reload",
      "allowlist on",
      "allowlist off"
    ],
    "args": [
      "allowlistAction",
      "player"
    ],
    "category": "Server"
  },
  {
    "command": "alwaysday",
    "description": "Legacy alias for daylock.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "legacy": true,
    "syntax": [
      "alwaysday [lock: Boolean]"
    ],
    "args": [
      "boolean"
    ],
    "category": "World"
  },
  {
    "command": "camera",
    "description": "Transforms the camera for selected players.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "camera <players: target> clear",
      "camera <players: target> fade",
      "camera <players: target> set <preset: string>"
    ],
    "args": [
      "target",
      "string"
    ],
    "category": "Player"
  },
  {
    "command": "camerashake",
    "description": "Applies or stops camera shake.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "camerashake add <player: target> [intensity: float] [seconds: float] [shakeType: positional|rotational]",
      "camerashake stop <player: target>"
    ],
    "args": [
      "target",
      "number",
      "cameraShakeType"
    ],
    "category": "Player"
  },
  {
    "command": "changesetting",
    "description": "Changes supported dedicated server settings while running.",
    "permission": "Owner",
    "requiresCheats": true,
    "dedicatedServerOnly": true,
    "syntax": [
      "changesetting allow-cheats <value: Boolean>",
      "changesetting difficulty <difficulty: Difficulty>"
    ],
    "args": [
      "boolean",
      "difficulty"
    ],
    "category": "Server"
  },
  {
    "command": "clear",
    "description": "Clears items from player inventory.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "clear [player: target] [itemName: Item] [data: int] [maxCount: int]"
    ],
    "args": [
      "target",
      "item",
      "number"
    ],
    "category": "Player"
  },
  {
    "command": "clearspawnpoint",
    "description": "Removes the spawn point for a player.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "clearspawnpoint [player: target]"
    ],
    "args": [
      "target"
    ],
    "category": "Player"
  },
  {
    "command": "clone",
    "description": "Clones blocks from one region to another.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "clone <begin: x y z> <end: x y z> <destination: x y z> [maskMode] [cloneMode]"
    ],
    "args": [
      "position",
      "maskMode",
      "cloneMode"
    ],
    "category": "Blocks"
  },
  {
    "command": "connect",
    "description": "Attempts to connect to a websocket server where supported.",
    "permission": "Admin",
    "requiresCheats": true,
    "legacy": true,
    "syntax": [
      "connect <serverUri: string>"
    ],
    "args": [
      "string"
    ],
    "category": "Debug"
  },
  {
    "command": "controlscheme",
    "description": "Sets or clears control scheme.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "controlscheme set <players: target> <scheme: string>",
      "controlscheme clear <players: target>"
    ],
    "args": [
      "target",
      "string"
    ],
    "category": "Player"
  },
  {
    "command": "damage",
    "description": "Applies damage to entities.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "damage <target: target> <amount: int> [cause: DamageCause] [entity: target]"
    ],
    "args": [
      "target",
      "number",
      "damageCause"
    ],
    "category": "Entity"
  },
  {
    "command": "daylock",
    "description": "Locks or unlocks the day-night cycle.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "daylock [lock: Boolean]"
    ],
    "args": [
      "boolean"
    ],
    "category": "World"
  },
  {
    "command": "deop",
    "description": "Revokes operator status from a player.",
    "permission": "Admin",
    "requiresCheats": false,
    "syntax": [
      "deop <player: target>"
    ],
    "args": [
      "player"
    ],
    "category": "Server"
  },
  {
    "command": "dialogue",
    "description": "Opens or changes NPC dialogue.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "dialogue open <npc: target> <player: target> [sceneName: string]",
      "dialogue change <npc: target> <sceneName: string> [player: target]"
    ],
    "args": [
      "target",
      "string"
    ],
    "category": "NPC"
  },
  {
    "command": "difficulty",
    "description": "Sets the difficulty level.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "difficulty peaceful",
      "difficulty easy",
      "difficulty normal",
      "difficulty hard"
    ],
    "args": [
      "difficulty"
    ],
    "category": "World"
  },
  {
    "command": "effect",
    "description": "Adds or clears status effects.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "effect <player: target> clear [effect: Effect]",
      "effect <player: target> <effect: Effect> [seconds: int] [amplifier: int] [hideParticles: Boolean]"
    ],
    "args": [
      "target",
      "effect",
      "number",
      "boolean"
    ],
    "category": "Player"
  },
  {
    "command": "enchant",
    "description": "Adds an enchantment to a player's selected item.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "enchant <player: target> <enchantmentName: Enchant> [level: int]"
    ],
    "args": [
      "target",
      "enchant",
      "number"
    ],
    "category": "Player"
  },
  {
    "command": "event",
    "description": "Triggers an event for entities.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "event entity <target: target> <eventName: string>"
    ],
    "args": [
      "target",
      "string"
    ],
    "category": "Entity"
  },
  {
    "command": "execute",
    "description": "Executes a command with modified context.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "execute as <origin: target> run <command: command>",
      "execute at <origin: target> run <command: command>",
      "execute positioned <position: x y z> run <command: command>",
      "execute if entity <target: target> run <command: command>"
    ],
    "args": [
      "target",
      "position",
      "command"
    ],
    "category": "Commands"
  },
  {
    "command": "fill",
    "description": "Fills a region with a block.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "fill <from: x y z> <to: x y z> <tileName: Block> [blockStates] [oldBlockHandling]"
    ],
    "args": [
      "position",
      "block",
      "fillMode"
    ],
    "category": "Blocks"
  },
  {
    "command": "fog",
    "description": "Adds or removes fog settings.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "fog <victim: target> push <fogID: string> <userProvidedId: string>",
      "fog <victim: target> pop <userProvidedId: string>",
      "fog <victim: target> remove <userProvidedId: string>"
    ],
    "args": [
      "target",
      "string"
    ],
    "category": "World"
  },
  {
    "command": "function",
    "description": "Runs a function file.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "function <name: filepath>"
    ],
    "args": [
      "function"
    ],
    "category": "Commands"
  },
  {
    "command": "gamemode",
    "description": "Sets a player's game mode.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "gamemode survival [player: target]",
      "gamemode creative [player: target]",
      "gamemode adventure [player: target]",
      "gamemode spectator [player: target]"
    ],
    "args": [
      "gamemode",
      "target"
    ],
    "category": "Player"
  },
  {
    "command": "gamerule",
    "description": "Sets or queries a game rule value.",
    "permission": "Game Directors",
    "requiresCheats": false,
    "syntax": [
      "gamerule",
      "gamerule <rule: BoolGameRule> [value: Boolean]",
      "gamerule <rule: IntGameRule> [value: int]"
    ],
    "args": [
      "gamerule",
      "boolean",
      "number"
    ],
    "category": "World"
  },
  {
    "command": "gametest",
    "description": "Configures GameTest framework tests. Requires Beta APIs experiment.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "experimental": true,
    "syntax": [
      "gametest run <testName: string>",
      "gametest runall",
      "gametest clearall"
    ],
    "args": [
      "string"
    ],
    "category": "Experimental"
  },
  {
    "command": "give",
    "description": "Gives an item to a player.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "give <player: target> <itemName: Item> [amount: int] [data: int] [components: json]"
    ],
    "args": [
      "target",
      "item",
      "number",
      "json"
    ],
    "category": "Player"
  },
  {
    "command": "help",
    "description": "Shows commands or syntax help.",
    "permission": "Any",
    "requiresCheats": false,
    "syntax": [
      "help",
      "help <page: int>",
      "help <command: CommandName>"
    ],
    "args": [
      "command",
      "number"
    ],
    "category": "Help"
  },
  {
    "command": "hud",
    "description": "Configures HUD element visibility.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "hud <target: target> hide <hudElement: string>",
      "hud <target: target> reset <hudElement: string>"
    ],
    "args": [
      "target",
      "string"
    ],
    "category": "Player"
  },
  {
    "command": "immutableworld",
    "description": "Legacy/Education immutable world setting.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "legacy": true,
    "syntax": [
      "immutableworld [value: Boolean]"
    ],
    "args": [
      "boolean"
    ],
    "category": "Legacy"
  },
  {
    "command": "inputpermission",
    "description": "Manages player input permissions.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "inputpermission set <targets: target> <permission: string> <state: string>",
      "inputpermission query <targets: target> <permission: string>"
    ],
    "args": [
      "target",
      "string"
    ],
    "category": "Player"
  },
  {
    "command": "kick",
    "description": "Kicks a player from the server.",
    "permission": "Game Directors",
    "requiresCheats": false,
    "syntax": [
      "kick <name: target> [reason: message]"
    ],
    "args": [
      "player",
      "message"
    ],
    "category": "Server"
  },
  {
    "command": "kill",
    "description": "Kills entities.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "kill [target: target]"
    ],
    "args": [
      "target"
    ],
    "category": "Entity"
  },
  {
    "command": "list",
    "description": "Lists players on the server.",
    "permission": "Any",
    "requiresCheats": false,
    "syntax": [
      "list"
    ],
    "args": [],
    "category": "Server"
  },
  {
    "command": "locate",
    "description": "Finds nearest biome or structure.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "locate structure <feature: StructureFeature>",
      "locate biome <biome: Biome>"
    ],
    "args": [
      "structure",
      "biome"
    ],
    "category": "World"
  },
  {
    "command": "loot",
    "description": "Drops loot into inventories or the world.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "loot spawn <position: x y z> loot <lootTable: string>",
      "loot give <players: target> loot <lootTable: string>"
    ],
    "args": [
      "position",
      "target",
      "string"
    ],
    "category": "Items"
  },
  {
    "command": "me",
    "description": "Displays a message about yourself.",
    "permission": "Any",
    "requiresCheats": false,
    "syntax": [
      "me <action: message>"
    ],
    "args": [
      "message"
    ],
    "category": "Chat"
  },
  {
    "command": "mixer",
    "description": "Legacy Mixer interactivity command.",
    "permission": "Any",
    "requiresCheats": false,
    "legacy": true,
    "syntax": [
      "mixer"
    ],
    "args": [],
    "category": "Legacy"
  },
  {
    "command": "mobevent",
    "description": "Controls mob events.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "mobevent <event: MobEvent> [value: Boolean]"
    ],
    "args": [
      "mobEvent",
      "boolean"
    ],
    "category": "World"
  },
  {
    "command": "msg",
    "description": "Legacy/private message alias.",
    "permission": "Any",
    "requiresCheats": false,
    "legacy": true,
    "aliases": [
      "tell",
      "w"
    ],
    "syntax": [
      "msg <target: target> <message: message>"
    ],
    "args": [
      "target",
      "message"
    ],
    "category": "Chat"
  },
  {
    "command": "music",
    "description": "Controls music playback.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "music play <trackName: string> [volume: float] [fadeSeconds: float] [repeatMode]",
      "music stop [fadeSeconds: float]",
      "music volume <volume: float>"
    ],
    "args": [
      "string",
      "number"
    ],
    "category": "Audio"
  },
  {
    "command": "op",
    "description": "Grants operator status to a player.",
    "permission": "Admin",
    "requiresCheats": false,
    "syntax": [
      "op <player: target>"
    ],
    "args": [
      "player"
    ],
    "category": "Server"
  },
  {
    "command": "packstack",
    "description": "Prints client or server pack stack to chat.",
    "permission": "Any",
    "requiresCheats": false,
    "syntax": [
      "packstack"
    ],
    "args": [],
    "category": "Packs"
  },
  {
    "command": "particle",
    "description": "Creates a particle emitter.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "particle <effect: string> [position: x y z]"
    ],
    "args": [
      "string",
      "position"
    ],
    "category": "World"
  },
  {
    "command": "permission",
    "description": "Reloads and applies permissions. Dedicated server only.",
    "permission": "Owner",
    "requiresCheats": true,
    "dedicatedServerOnly": true,
    "syntax": [
      "permission list",
      "permission reload"
    ],
    "args": [],
    "category": "Server"
  },
  {
    "command": "place",
    "description": "Places jigsaw structures, features or feature rules.",
    "permission": "Admin",
    "requiresCheats": true,
    "syntax": [
      "place feature <feature: string> [position: x y z]",
      "place structure <structure: string> [position: x y z]"
    ],
    "args": [
      "string",
      "position"
    ],
    "category": "World"
  },
  {
    "command": "playanimation",
    "description": "Makes entities play an animation.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "playanimation <entity: target> <animation: string> [next_state: string] [blend_out_time: float] [stop_expression: string] [controller: string]"
    ],
    "args": [
      "target",
      "string",
      "number"
    ],
    "category": "Entity"
  },
  {
    "command": "playsound",
    "description": "Plays a sound.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "playsound <sound: string> [player: target] [position: x y z] [volume: float] [pitch: float] [minimumVolume: float]"
    ],
    "args": [
      "string",
      "target",
      "position",
      "number"
    ],
    "category": "Audio"
  },
  {
    "command": "project",
    "description": "Editor project management command. Editor mode only.",
    "permission": "Game Directors",
    "requiresCheats": false,
    "editorOnly": true,
    "syntax": [
      "project <subcommand>"
    ],
    "args": [
      "string"
    ],
    "category": "Editor"
  },
  {
    "command": "recipe",
    "description": "Gives or takes recipes.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "recipe give <player: target> <recipe: string>",
      "recipe take <player: target> <recipe: string>"
    ],
    "args": [
      "target",
      "string"
    ],
    "category": "Player"
  },
  {
    "command": "reload",
    "description": "Reloads functions and scripts from behavior packs.",
    "permission": "Admin",
    "requiresCheats": true,
    "syntax": [
      "reload"
    ],
    "args": [],
    "category": "Server"
  },
  {
    "command": "reloadconfig",
    "description": "Reloads configuration files such as variables, secrets and permissions.",
    "permission": "Owner",
    "requiresCheats": true,
    "dedicatedServerOnly": true,
    "syntax": [
      "reloadconfig"
    ],
    "args": [],
    "category": "Server"
  },
  {
    "command": "reloadpacketlimitconfig",
    "description": "Reloads packet limit config from file.",
    "permission": "Owner",
    "requiresCheats": true,
    "dedicatedServerOnly": true,
    "syntax": [
      "reloadpacketlimitconfig"
    ],
    "args": [],
    "category": "Server"
  },
  {
    "command": "replaceitem",
    "description": "Replaces items in inventories.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "replaceitem entity <target: target> <slotType: EntityEquipmentSlot> <slotId: int> <itemName: Item> [amount: int] [data: int]",
      "replaceitem block <position: x y z> <slotId: int> <itemName: Item> [amount: int] [data: int]"
    ],
    "args": [
      "target",
      "position",
      "item",
      "number"
    ],
    "category": "Items"
  },
  {
    "command": "ride",
    "description": "Makes entities ride, stop riding, or evict riders.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "ride <riders: target> start_riding <ride: target>",
      "ride <riders: target> stop_riding",
      "ride <rides: target> evict_riders"
    ],
    "args": [
      "target"
    ],
    "category": "Entity"
  },
  {
    "command": "save",
    "description": "Controls or checks how the dedicated server saves data.",
    "permission": "Owner",
    "requiresCheats": true,
    "dedicatedServerOnly": true,
    "syntax": [
      "save hold",
      "save query",
      "save resume"
    ],
    "args": [
      "saveAction"
    ],
    "category": "Server"
  },
  {
    "command": "say",
    "description": "Broadcasts a chat message.",
    "permission": "Game Directors",
    "requiresCheats": false,
    "syntax": [
      "say <message: message>"
    ],
    "args": [
      "message"
    ],
    "category": "Chat"
  },
  {
    "command": "schedule",
    "description": "Schedules an action after time or once an area is loaded.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "schedule on_area_loaded add <from: x y z> <to: x y z> <function: filepath>",
      "schedule delay add <function: filepath> <delay: int>"
    ],
    "args": [
      "position",
      "function",
      "number"
    ],
    "category": "Commands"
  },
  {
    "command": "scoreboard",
    "description": "Manages scoreboard objectives and player scores.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "scoreboard objectives list",
      "scoreboard objectives add <objective: string> dummy [displayName: string]",
      "scoreboard objectives remove <objective: string>",
      "scoreboard players list [player: target]",
      "scoreboard players set <player: target> <objective: string> <count: int>"
    ],
    "args": [
      "target",
      "string",
      "number"
    ],
    "category": "Commands"
  },
  {
    "command": "script",
    "description": "Debugging and profiling options for script runtime.",
    "permission": "Admin",
    "requiresCheats": true,
    "syntax": [
      "script debugger connect <host: string> <port: int>",
      "script profiler start",
      "script profiler stop"
    ],
    "args": [
      "string",
      "number"
    ],
    "category": "Debug"
  },
  {
    "command": "scriptevent",
    "description": "Fires a script event with payload.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "scriptevent <messageId: string> [message: message]"
    ],
    "args": [
      "string",
      "message"
    ],
    "category": "Scripting"
  },
  {
    "command": "sendshowstoreoffer",
    "description": "Dedicated server command to open marketplace page for players.",
    "permission": "Owner",
    "requiresCheats": true,
    "dedicatedServerOnly": true,
    "syntax": [
      "sendshowstoreoffer <player: target> <offerId: string>"
    ],
    "args": [
      "target",
      "string"
    ],
    "category": "Server"
  },
  {
    "command": "setblock",
    "description": "Changes a block to another block.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "setblock <position: x y z> <tileName: Block> [blockStates] [oldBlockHandling]"
    ],
    "args": [
      "position",
      "block",
      "setBlockMode"
    ],
    "category": "Blocks"
  },
  {
    "command": "setmaxplayers",
    "description": "Sets maximum player count for this game session.",
    "permission": "Host",
    "requiresCheats": true,
    "syntax": [
      "setmaxplayers <maxPlayers: int>"
    ],
    "args": [
      "number"
    ],
    "category": "Server"
  },
  {
    "command": "setworldspawn",
    "description": "Sets the world spawn location.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "setworldspawn [spawnPoint: x y z]"
    ],
    "args": [
      "position"
    ],
    "category": "World"
  },
  {
    "command": "spawnpoint",
    "description": "Sets the spawn point for a player.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "spawnpoint [player: target] [spawnPos: x y z]"
    ],
    "args": [
      "target",
      "position"
    ],
    "category": "Player"
  },
  {
    "command": "spreadplayers",
    "description": "Teleports entities to random locations.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "spreadplayers <x: value> <z: value> <spreadDistance: float> <maxRange: float> <victim: target>"
    ],
    "args": [
      "number",
      "target"
    ],
    "category": "Entity"
  },
  {
    "command": "stop",
    "description": "Stops the dedicated server.",
    "permission": "Owner",
    "requiresCheats": true,
    "dedicatedServerOnly": true,
    "syntax": [
      "stop"
    ],
    "args": [],
    "category": "Server"
  },
  {
    "command": "stopsound",
    "description": "Stops a sound.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "stopsound <player: target> [sound: string]"
    ],
    "args": [
      "target",
      "string"
    ],
    "category": "Audio"
  },
  {
    "command": "structure",
    "description": "Saves, loads or deletes structures.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "structure save <name: string> <from: x y z> <to: x y z> [saveMode]",
      "structure load <name: string> <to: x y z> [rotation] [mirror]",
      "structure delete <name: string>"
    ],
    "args": [
      "string",
      "position",
      "rotation",
      "mirror"
    ],
    "category": "World"
  },
  {
    "command": "summon",
    "description": "Summons an entity.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "summon <entityType: EntityType> [spawnPos: x y z] [spawnEvent: string] [nameTag: string]"
    ],
    "args": [
      "entity",
      "position",
      "string"
    ],
    "category": "Entity"
  },
  {
    "command": "tag",
    "description": "Manages tags stored in entities.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "tag <entity: target> add <name: string>",
      "tag <entity: target> remove <name: string>",
      "tag <entity: target> list"
    ],
    "args": [
      "target",
      "string"
    ],
    "category": "Entity"
  },
  {
    "command": "teleport",
    "description": "Teleports entities.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "aliases": [
      "tp"
    ],
    "syntax": [
      "teleport <destination: x y z>",
      "teleport <victim: target> <destination: x y z>",
      "teleport <victim: target> <destination: target>"
    ],
    "args": [
      "target",
      "position"
    ],
    "category": "Entity"
  },
  {
    "command": "tell",
    "description": "Sends a private message.",
    "permission": "Any",
    "requiresCheats": false,
    "aliases": [
      "w",
      "msg"
    ],
    "syntax": [
      "tell <target: target> <message: message>"
    ],
    "args": [
      "target",
      "message"
    ],
    "category": "Chat"
  },
  {
    "command": "tellraw",
    "description": "Sends a JSON message to players.",
    "permission": "Game Directors",
    "requiresCheats": false,
    "syntax": [
      "tellraw <target: target> <raw json message: json>"
    ],
    "args": [
      "target",
      "json"
    ],
    "category": "Chat"
  },
  {
    "command": "testfor",
    "description": "Counts matching entities.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "testfor <victim: target>"
    ],
    "args": [
      "target"
    ],
    "category": "Entity"
  },
  {
    "command": "testforblock",
    "description": "Tests whether a block is at a location.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "testforblock <position: x y z> <tileName: Block> [dataValue: int]"
    ],
    "args": [
      "position",
      "block",
      "number"
    ],
    "category": "Blocks"
  },
  {
    "command": "testforblocks",
    "description": "Tests whether two block regions match.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "testforblocks <begin: x y z> <end: x y z> <destination: x y z> [mode: MaskMode]"
    ],
    "args": [
      "position",
      "maskMode"
    ],
    "category": "Blocks"
  },
  {
    "command": "tickingarea",
    "description": "Adds, removes or lists ticking areas.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "tickingarea add <from: x y z> <to: x y z> [name: string] [preload: Boolean]",
      "tickingarea add circle <center: x y z> <radius: int> [name: string] [preload: Boolean]",
      "tickingarea remove <position: x y z>",
      "tickingarea remove <name: string>",
      "tickingarea remove_all",
      "tickingarea list [all-dimensions]"
    ],
    "args": [
      "position",
      "number",
      "boolean",
      "string"
    ],
    "category": "World"
  },
  {
    "command": "time",
    "description": "Changes or queries world time.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "time add <amount: int>",
      "time query daytime",
      "time query gametime",
      "time query day",
      "time set day",
      "time set night",
      "time set noon",
      "time set midnight",
      "time set <amount: int>"
    ],
    "args": [
      "time",
      "number"
    ],
    "category": "World"
  },
  {
    "command": "title",
    "description": "Controls plain text screen titles.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "title <player: target> title <titleText: message>",
      "title <player: target> subtitle <titleText: message>",
      "title <player: target> actionbar <titleText: message>",
      "title <player: target> clear",
      "title <player: target> reset",
      "title <player: target> times <fadeIn: int> <stay: int> <fadeOut: int>"
    ],
    "args": [
      "target",
      "message",
      "number"
    ],
    "category": "Chat"
  },
  {
    "command": "titleraw",
    "description": "Controls JSON screen titles.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "titleraw <player: target> title <raw json titleText: json>",
      "titleraw <player: target> subtitle <raw json titleText: json>",
      "titleraw <player: target> actionbar <raw json titleText: json>"
    ],
    "args": [
      "target",
      "json"
    ],
    "category": "Chat"
  },
  {
    "command": "toggledownfall",
    "description": "Toggles weather.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "toggledownfall"
    ],
    "args": [],
    "category": "World"
  },
  {
    "command": "tp",
    "description": "Alias for teleport.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "aliases": [
      "teleport"
    ],
    "syntax": [
      "tp <destination: x y z>",
      "tp <victim: target> <destination: x y z>",
      "tp <victim: target> <destination: target>"
    ],
    "args": [
      "target",
      "position"
    ],
    "category": "Entity"
  },
  {
    "command": "transfer",
    "description": "Transfers a player to another server.",
    "permission": "Owner",
    "requiresCheats": true,
    "syntax": [
      "transfer <player: target> <serverAddress: string> [port: int]"
    ],
    "args": [
      "target",
      "string",
      "number"
    ],
    "category": "Server"
  },
  {
    "command": "videostream",
    "description": "Legacy video streaming command.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "legacy": true,
    "syntax": [
      "videostream <serverUri: string>"
    ],
    "args": [
      "string"
    ],
    "category": "Legacy"
  },
  {
    "command": "videostreamaction",
    "description": "Legacy video streaming action command.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "legacy": true,
    "syntax": [
      "videostreamaction <action: string>"
    ],
    "args": [
      "string"
    ],
    "category": "Legacy"
  },
  {
    "command": "volumearea",
    "description": "Legacy/experimental volume area command.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "legacy": true,
    "syntax": [
      "volumearea add <from: x y z> <to: x y z> <identifier: string> <name: string>",
      "volumearea remove <name: string>",
      "volumearea list"
    ],
    "args": [
      "position",
      "string"
    ],
    "category": "Legacy"
  },
  {
    "command": "weather",
    "description": "Sets weather.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "weather clear [duration: int]",
      "weather rain [duration: int]",
      "weather thunder [duration: int]"
    ],
    "args": [
      "weather",
      "number"
    ],
    "category": "World"
  },
  {
    "command": "worldbuilder",
    "description": "Legacy/Education worldbuilder command.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "legacy": true,
    "syntax": [
      "worldbuilder"
    ],
    "args": [],
    "category": "Legacy"
  },
  {
    "command": "wsserver",
    "description": "Connects to a websocket server.",
    "permission": "Admin",
    "requiresCheats": true,
    "syntax": [
      "wsserver <serverUri: string>"
    ],
    "args": [
      "string"
    ],
    "category": "Debug"
  },
  {
    "command": "xp",
    "description": "Adds or removes player experience.",
    "permission": "Game Directors",
    "requiresCheats": true,
    "syntax": [
      "xp <amount: int> [player: target]",
      "xp <amount: int>L [player: target]"
    ],
    "args": [
      "target",
      "number"
    ],
    "category": "Player"
  }
];
