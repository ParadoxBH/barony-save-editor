// Item representation in inventory
interface Item {
  type: number;
  status: number;
  appearance: number;
  beatitude: number;
  count: number;
  identified: boolean;
  x: number;
  y: number;
}
// Equipment slot mapping
interface EquipmentSlot {
  first: string;
  second: number | Item;
}

// Player/NPC stats
interface Stats {
  name: string;
  type: number;
  sex: number;
  appearance: number;
  HP: number;
  maxHP: number;
  MP: number;
  maxMP: number;
  STR: number;
  DEX: number;
  CON: number;
  INT: number;
  PER: number;
  CHR: number;
  EXP: number;
  LVL: number;
  GOLD: number;
  HUNGER: number;
  PROFICIENCIES: number[];
  EFFECTS: number[];
  EFFECTS_TIMERS: number[];
  MISC_FLAGS: number[];
  player_equipment: EquipmentSlot[];
  npc_equipment: EquipmentSlot[];
  inventory: Item[];
  attributes: any[];
  lootbags: any[];
}

// Follower/NPC entity
interface Follower {
  name: string;
  type: number;
  sex: number;
  appearance: number;
  HP: number;
  maxHP: number;
  MP: number;
  maxMP: number;
  STR: number;
  DEX: number;
  CON: number;
  INT: number;
  PER: number;
  CHR: number;
  EXP: number;
  LVL: number;
  GOLD: number;
  HUNGER: number;
  PROFICIENCIES: number[];
  EFFECTS: number[];
  EFFECTS_TIMERS: number[];
  MISC_FLAGS: number[];
  player_equipment: any[];
  npc_equipment: any[];
  inventory: any[];
  attributes: any[];
  lootbags: any[];
}

// Shopkeeper hostility data
interface ShopkeeperHostilityData {
  wanted_level: number;
  player_race: number;
  equipment: number;
  type: number;
  sex: number;
  player: number;
  num_aggressions: number;
  num_kills: number;
  num_accessories: number;
}

interface ShopkeeperHostility {
  first: number;
  second: ShopkeeperHostilityData;
}

// Compendium item event
interface CompendiumItemEvent {
  first: string;
  second: number[];
}

// Item degrade RNG
interface ItemDegradeRng {
  first: number;
  second: number;
}

interface Recipe {
  first: number,
  second: {
    first: number,
    second: number,
  }
}

interface Scroll {
  
}

// Player data
interface Player {
  char_class: number;
  race: number;
  kills: number[];
  conduct_penniless: boolean;
  conduct_foodless: boolean;
  conduct_vegetarian: boolean;
  conduct_illiterate: boolean;
  additional_conducts: number[];
  hotbar: number[];
  hotbar_alternate: number[][];
  selected_spell: number;
  selected_spell_alternate: number[];
  selected_spell_last_appearance: number;
  spells: number[];
  recipes: Recipe[];
  scrolls: Scroll[];
  stats: Stats;
  followers: Follower[];
  game_statistics: number[];
  shopkeeper_hostility: ShopkeeperHostility[];
  compendium_item_events: CompendiumItemEvent[];
  item_degrade_rng: ItemDegradeRng[];
  sustained_mp_used: number;
}

// Map message
interface MapMessage {
  first: string;
  second: string;
}

// Main save file structure
interface GameData {
  magic_cookie: string;
  game_version: number;
  timestamp: string;
  hash: number;
  game_name: string;
  gamekey: number;
  lobbykey: number;
  mapseed: number;
  gametimer: number;
  svflags: number;
  player_num: number;
  multiplayer_type: number;
  dungeon_lvl: number;
  level_track: number;
  customseed: number;
  customseed_string: string;
  players_connected: number[];
  players: Player[];
  additional_data: any[];
  map_messages: MapMessage[];
}

// Type guard para validar o save file
function isBaronySaveFile(obj: any): obj is GameData {
  return (
    obj &&
    obj.magic_cookie === "BARONYJSONSAVE" &&
    typeof obj.game_version === "number" &&
    Array.isArray(obj.players) &&
    Array.isArray(obj.players_connected)
  );
}

export type {
  GameData,
  Player,
  Item
};

export { isBaronySaveFile };