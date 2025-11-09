import React, { useState } from "react";
import { Box, Grid, Paper, Stack, Tooltip, Typography } from "@mui/material";
import type { Item, Stats } from "../components/SaveDefinition";

import { ItemSlot } from "../components/ItemSlot";
import {
  getCharacter,
  setPlayerStatsInventory,
  useAppDispatch,
} from "../StoreContext";
import { genItemNull, ItemEditor } from "./ItemEditor";

export const ITEMID_BACKPACK = 220;

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
  inventoryId?: number;
}

export function includeEquipamentBag(stats?: Stats | undefined) {
  return !!stats?.player_equipment.find((slot) => {
    const item = slot.second;
    
    // Se for um objeto Item, verifica o status diretamente
    if (typeof item === "object" && item !== null) {
      return item.status === ITEMID_BACKPACK;
    }
    
    // Se for um número, busca no inventory
    if (typeof item === "number" && item >= 0 && item < stats.inventory.length && stats.inventory[item]) {
      return stats.inventory[item].type === ITEMID_BACKPACK;
    }
    
    return false;
  });
}

// Componente principal do inventário
export const InventoryGrid: React.FC<InventoryGridProps> = ({}) => {
  const [editSlot, setEditSlot] = useState<slotEditing | undefined>(undefined);
  const stats = getCharacter()?.stats;
  const inventory = stats?.inventory;
  const dispatch = useAppDispatch();

  const ROWS = includeEquipamentBag(stats) ? 8 : 6;
  const COLS = 5;

  function itensInBag(item: Item) {
    const { x, y } = item;
    //É uma spell ?
    if (item.type === 162) return false;
    //Esta dentro da area do inventario ?
    if (x >= 0 && x < COLS && y >= 0 && y < ROWS) return true;
    return false;
  }

  // Cria uma matriz 5x8 e preenche com os itens baseado em suas coordenadas x, y
  const createGrid = () => {
    const grid: (Item | null)[][] = Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(null));
    const gridItem: { [key: string]: number } = {};
    inventory?.forEach((item, index) => {
      const { x, y } = item;
      if (itensInBag(item)) {
        grid[y][x] = item;
        gridItem[`${x}_${y}`] = index;
      }
    });
    return { grid, gridItem };
  };

  const { grid, gridItem } = createGrid();

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
    let newInv = [...inventory];
    if (editSlot.inventoryId !== undefined) newInv[editSlot.inventoryId] = item;
    else newInv.push({ ...item, x: editSlot.x, y: editSlot.y });
    dispatch(setPlayerStatsInventory(newInv));
  }

  function handleDeleteItem() {
    setEditSlot(undefined);
    if (
      !inventory ||
      editSlot === undefined ||
      editSlot.inventoryId === undefined
    )
      return;
    let newInv = [...inventory];
    newInv.splice(editSlot.inventoryId);
    dispatch(setPlayerStatsInventory(newInv));
  }

  return (
    <Paper elevation={3}>
      <Box p={3}>
        <Stack spacing={1} alignItems={"center"}>
          {grid.map((row, rowIndex) => (
            <>
              {(rowIndex === 6 || rowIndex === 0) && (
                <Typography variant="h6" gutterBottom>
                  {rowIndex === 6 ? "Mochila" : "Inventário"}
                </Typography>
              )}
              <Stack spacing={1} direction={"row"}>
                {row.map((item, colIndex) => (
                  <Grid size={12 / COLS} key={`${colIndex}-${rowIndex}`}>
                    <Tooltip
                      title={getTooltipTitle(item)}
                      arrow
                      disableInteractive
                      placement="right"
                    >
                      <ItemSlot
                        item={item}
                        selected={
                          gridItem[`${colIndex}_${rowIndex}`] ===
                          editSlot?.inventoryId
                        }
                        onClick={() =>
                          handleSlotClick({
                            x: colIndex,
                            y: rowIndex,
                            item: item || genItemNull(),
                            inventoryId: gridItem[`${colIndex}_${rowIndex}`],
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
