import type { GameData } from "./SaveDefinition";


interface EditorData {
  save: GameData;
  players: Player[];
}

type EquipmentSlotFirst = "amulet" | "weapon" | "shield" | "gloves" | "ring" | "cloak" | "shoes" | "breastplate" | "helmet" | "mask" ;

interface Unlockable {
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

type PlayerEquipment =  { [key: string]: Item };
type PlayerInventory =  { [key: string]: Item };
type PlayerUnlockable = {[key: string]: Unlockable}

interface Player {
  _uuid: string;
  name: string;

  spells: PlayerUnlockable;
  //recipes: PlayerUnlockable;
  //scrolls: PlayerUnlockable;
  
  equipment: PlayerEquipment;
  inventory: PlayerInventory;
  hotbar: Hotbar[];
}

export type { EditorData, Item, Player, Hotbar, EquipmentSlotFirst, PlayerEquipment, PlayerInventory, PlayerUnlockable };
