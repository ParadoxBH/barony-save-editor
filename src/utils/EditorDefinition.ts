import type { GameData } from "./SaveDefinition";

interface EditorData {
  save: GameData;
  players: Player[];
}

type EquipmentSlotFirst =
  | "amulet"
  | "weapon"
  | "shield"
  | "gloves"
  | "ring"
  | "cloak"
  | "shoes"
  | "breastplate"
  | "helmet"
  | "mask";

export interface Unlockable {
  type: number;
  unlocked: boolean;
}

interface Hotbar {
  type: "equipament" | "inventory" | "spell";
  uuid: string;
}

interface Item {
  _uuid: string;

  item_id: string;
  type: number;
  status: number;
  appearance: number;
  beatitude: number;
  count: number;
  identified: boolean;
  x: number;
  y: number;
}

type PlayerEquipment = { [key: string]: Item };
type PlayerInventory = { [key: string]: Item };
type PlayerUnlockable = { [key: string]: Unlockable };

interface PlayerStats {
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
  }

interface Player {
  _uuid: string;
  name: string;

  stats: PlayerStats;

  spells: PlayerUnlockable;
  //recipes: PlayerUnlockable;
  //scrolls: PlayerUnlockable;

  equipment: PlayerEquipment;
  inventory: PlayerInventory;
  hotbar: Hotbar[];
}

export type {
  EditorData,
  Item,
  Player,
  Hotbar,
  EquipmentSlotFirst,
  PlayerEquipment,
  PlayerStats,
  PlayerInventory,
  PlayerUnlockable,
};
