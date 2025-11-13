import React, { useState } from "react";
import { Box, Grid, Paper, Stack, Tooltip, Typography } from "@mui/material";
import type { Item } from "../utils/EditorDefinition";

import { ItemSlot } from "../components/ItemSlot";
import {
  getCharacter,
  setPlayerInventory,
  useAppDispatch,
} from "../StoreContext";
import { genItemNull, ItemEditor } from "./ItemEditor";
import type { Player } from "../utils/EditorDefinition";
import { useLanguage } from "../components/language";

export const ITEMID_BACKPACK = 220;
export const ITEMID_SPELL = 162;
export const ITEMREF_NULL = 4294967295;

interface InventoryGridProps {}

export interface SlotData {
  x: number;
  y: number;
  item: Item | null;
  index: number;
}

export interface slotEditing {
  x: number;
  y: number;
  item?: Item;
}

export function includeEquipamentBag(player?: Player) {
  return !!Object.values(player?.equipment || [])
  .find((slot) => slot.type === ITEMID_BACKPACK);
}

// Componente principal do inventário
export const InventoryGrid: React.FC<InventoryGridProps> = ({}) => {
  const [editSlot, setEditSlot] = useState<slotEditing | undefined>(undefined);
  const stats = getCharacter();
  const inventory = stats?.inventory;
  const dispatch = useAppDispatch();
  const language = useLanguage();

  const ROWS = includeEquipamentBag(stats) ? 8 : 6;
  const COLS = 5;

  function itensInBag(item: Item) {
    const { x, y } = item;
    //É uma spell ?
    if (item.type === ITEMID_SPELL) return false;
    //Esta dentro da area do inventario ?
    if (x >= 0 && x < COLS && y >= 0 && y < ROWS) return true;
    return false;
  }

  // Cria uma matriz 5x8 e preenche com os itens baseado em suas coordenadas x, y
  const createGrid = () => {
    const grid: (string)[][] = Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(null));
    (Object.values(inventory || [])).forEach((item) => {
      const { x, y } = item;
      if (itensInBag(item))
        grid[y][x] = item._uuid;
    });
    return grid ;
  };

  const grid = createGrid();

  const handleSlotClick = (props: slotEditing): void => {
    setEditSlot(props);
  };

  const getTooltipTitle = (item: Item | null): string => {
    if (!item) return "Slot vazio";
    return `Tipo: ${item.type}\nStatus: ${item.status}\nQuantidade: ${item.count}`;
  };

  function handleSetItemSlot(item: Item) {
    setEditSlot(undefined);
    if (!inventory || editSlot === undefined) return;
    let newInv = {...inventory};
    newInv[item._uuid] = item;
    dispatch(setPlayerInventory(newInv));
  }

  function handleDeleteItem() {
    setEditSlot(undefined);
    if (
      !inventory ||
      editSlot === undefined ||
      editSlot.item === undefined
    )
      return;
    let newInv = {...inventory};
    delete(newInv[editSlot.item?._uuid]);
    dispatch(setPlayerInventory(newInv));
  }

  return (
    <Paper elevation={3}>
      <Box p={3}>
        <Stack spacing={1} alignItems={"center"}>
          {grid.map((row, rowIndex) => (
            <>
              {(rowIndex === 6 || rowIndex === 0) && (
                <Typography variant="h6" gutterBottom>
                  {rowIndex === 6 ? language.get("tab_inventory_backpack") : language.get("tab_inventory")}
                </Typography>
              )}
              <Stack spacing={1} direction={"row"}>
                {row.map((item, colIndex) => (
                  <Grid size={12 / COLS} key={`${colIndex}-${rowIndex}`}>
                    <Tooltip
                      title={getTooltipTitle(inventory ? inventory[item] || null : null)}
                      arrow
                      disableInteractive
                      placement="right"
                    >
                      <ItemSlot
                        item={inventory ? inventory[item] || null : null}
                        selected={item === editSlot?.item?._uuid}
                        onClick={() =>
                          handleSlotClick({
                            x: colIndex,
                            y: rowIndex,
                            item: inventory ? inventory[item] || genItemNull() : genItemNull(),
                          })
                        }
                      />
                    </Tooltip>
                  </Grid>
                ))}
              </Stack>
            </>
          ))}
        </Stack>
        <ItemEditor
          item={editSlot?.item}
          onChange={handleSetItemSlot}
          onClose={() => setEditSlot(undefined)}
          onDelete={handleDeleteItem}
        />
      </Box>
    </Paper>
  );
};
