import type {
  GameData,
  Item as SavePlayerStatsInventory,
  Player as SavePlayer,
} from "./SaveDefinition";
import type {
  EditorData,
  Hotbar,
  Item,
  Player,
  PlayerEquipment,
  PlayerInventory,
  PlayerUnlockable,
} from "./EditorDefinition";
import { guid } from "./utils";
import { type ItemDataMap } from "../StoreContext";
import { genItemNull } from "../pages/ItemEditor";
import { ITEMID_SPELL, ITEMREF_NULL } from "../pages/Inventory";

function parseItem(itens: ItemDataMap, i: SavePlayerStatsInventory): Item {
  return {
    _uuid: guid(),
    item_id: i.type in itens ? itens[i.type] : "",
    ...i,
  } as Item;
}

export function parseToEditor(itens: ItemDataMap, save: GameData): EditorData {
  function getBag(
    inv: Item[],
    item: number | SavePlayerStatsInventory
  ): { item?: Item; slot?: number } {
    if (typeof item === "object") return { item: parseItem(itens, item) };
    else if (item < inv.length) return { item: inv[item], slot: item };
    return {};
  }

  return {
    save: save,
    dungeon: { level: save.dungeon_lvl, secret: save.level_track > 0 },
    players: save.players.map((p) => {
      const inventory: Item[] = p.stats.inventory.map((i) =>
        parseItem(itens, i)
      );
      const equipSlot: { [key: number]: string } = {};
      const spellSlot: { [key: number]: string } = {};
      return {
        _uuid: guid(),
        name: p.stats.name,

        spells: p.spells.reduce((result, s) => {
          const { item, slot } = getBag(inventory, s);
          if (item) {
            result[item.appearance] = {
              type: item.appearance,
              unlocked: true,
            };
            if (slot) spellSlot[slot] = item._uuid;
          }
          return result;
        }, {} as PlayerUnlockable),

        //Status
        stats: {
          HP: p.stats.HP,
          maxHP: p.stats.maxHP,
          MP: p.stats.MP,
          maxMP: p.stats.maxMP,
          STR: p.stats.STR,
          DEX: p.stats.DEX,
          CON: p.stats.CON,
          INT: p.stats.INT,
          PER: p.stats.PER,
          CHR: p.stats.CHR,
          EXP: p.stats.EXP,
          LVL: p.stats.LVL,
          GOLD: p.stats.GOLD,
          HUNGER: p.stats.HUNGER,
        },

        //Proficiencies
        proficiencies: p.stats.PROFICIENCIES,

        //Equipament
        equipment: p.stats.player_equipment.reduce((result, e) => {
          const { item, slot } = getBag(inventory, e.second);
          if (item != null) {
            result[e.first] = item;
            if (slot) equipSlot[slot] = item._uuid;
          }
          return result;
        }, {} as PlayerEquipment) as PlayerEquipment,
        //Inventory
        inventory: inventory.reduce((result, i) => {
          result[i._uuid] = i;
          return result;
        }, {} as PlayerInventory),
        //Hotbar
        hotbar: p.hotbar.map((h) => {
          const { item, slot } = getBag(inventory, h);
          if (item != null)
            return { type: "inventory", uuid: item._uuid } as Hotbar;
          if (slot && slot in equipSlot)
            return { type: "equipament", uuid: equipSlot[slot] } as Hotbar;
          if (slot && slot in spellSlot)
            return { type: "spell", uuid: spellSlot[slot] } as Hotbar;
          return null;
        }) as Hotbar[],
      } as Player;
    }),
  } as EditorData;
}

export function parseToSave(editor: EditorData): GameData {
  const players: SavePlayer[] = [];
  for (const player of editor.save.players) {
    const editorPlayer = editor.players[players.length];
    const spells: string[] = [];
    const inventory = [
      ...Object.values(editorPlayer.inventory),
      ...Object.values(editorPlayer.equipment),
      ...Object.values(editorPlayer.spells)
        .filter((s) => s.unlocked)
        .map((s, index) => {
          const spellItem = genItemNull();
          spellItem.x = index%4;
          spellItem.y = Math.floor(index/4);
          spellItem.type = ITEMID_SPELL;
          spellItem.appearance = s.type;
          spells.push(spellItem._uuid);
          return spellItem;
        }),
    ];
    const inventoryId = inventory.reduce((result, item, index) => {
      result[item._uuid] = index;
      return result;
    }, {} as { [key: string]: number });

    players.push({
      ...player,
      spells: spells.map(s => inventoryId[s]),
      hotbar: player.hotbar.map(h => ITEMREF_NULL),
      hotbar_alternate: player.hotbar_alternate.map(h => h.map(h => ITEMREF_NULL)),
      selected_spell: ITEMREF_NULL,
      selected_spell_alternate: player.selected_spell_alternate.map(h => ITEMREF_NULL),
      selected_spell_last_appearance: -1,
      stats: {
        ...player.stats,
        ...editorPlayer.stats,
        PROFICIENCIES: editorPlayer.proficiencies,
        inventory: inventory.map(i => ({
          type: i.type,
          status: i.status,
          appearance: i.appearance,
          beatitude: i.beatitude,
          count: i.count,
          identified: i.identified,
          x: i.x,
          y: i.y,
        })),
        player_equipment: Object.keys(editorPlayer.equipment).map(e => ({
          first: e,
          second: editorPlayer.equipment[e]._uuid in inventoryId ? inventoryId[editorPlayer.equipment[e]._uuid] : editorPlayer.equipment[e],
        }))
      }
    });
  }

  return {
    ...editor.save,
    dungeon_lvl: editor.dungeon.level,
    level_track: editor.dungeon.secret ? 1 : 0,
    players: players,
  } as GameData;
}
