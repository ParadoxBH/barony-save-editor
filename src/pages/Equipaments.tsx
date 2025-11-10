import { Paper, Box, Stack, Typography } from "@mui/material";
import { ItemSlot, getSlotColor } from "../components/ItemSlot";
import { getCharacter } from "../StoreContext";
import type { EquipmentSlotFirst } from "../components/SaveDefinition";
import { ItemSelectionDialog } from "../components/ItemSelectionDialog";
import { useState } from "react";

export function Equipaments() {
  const character = getCharacter();
  const inventory = character?.stats.inventory || [];
  const equipment = character?.stats.player_equipment || [];
  const [slotEdit, setSlotEdit] = useState<string | undefined>(undefined);

  function getItemSlot(slot_name?: EquipmentSlotFirst) {
    const slot = equipment.findIndex((e) => e.first === slot_name);
    if (slot < 0) return null;
    if (slot < equipment.length && equipment[slot].second !== undefined) {
      if (typeof equipment[slot].second === "object")
        return equipment[slot].second;
      else if (equipment[slot].second < inventory.length)
        return inventory[equipment[slot].second];
    }
    return null;
  }

  const slotsL: EquipmentSlotFirst[] = [
    "mask",
    "cloak",
    "amulet",
    "ring",
    "shield",
  ];

  const slotsR: EquipmentSlotFirst[] = [
    "helmet",
    "breastplate",
    "gloves",
    "boots",
    "weapon",
  ];

  return (
    <Paper elevation={3}>
      <Stack p={3} alignItems={"center"} spacing={2}>
        <Typography variant="h6" gutterBottom>
          Equipamento
        </Typography>
        <Stack
          spacing={1}
          direction={"row"}
          alignItems="stretch"
          alignContent={"stretch"}
        >
          <Stack spacing={1} alignItems={"center"}>
            {slotsL.map((s) => (
              <ItemSlot
                key={`slot_${s}`}
                item={getItemSlot(s)}
                onClick={() => setSlotEdit(s)}
              />
            ))}
          </Stack>
          <Box
            sx={{
              background: getSlotColor(null),
              width: 150,
              flex: 1,
              borderRadius: 1,
            }}
          />
          <Stack spacing={1} alignItems={"center"}>
            {slotsR.map((s) => (
              <ItemSlot
                key={`slot_${s}`}
                item={getItemSlot(s)}
                onClick={() => setSlotEdit(s)}
              />
            ))}
          </Stack>
        </Stack>
        <ItemSelectionDialog
          open={false}
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
          onSelectItem={function (item: number): void {
            throw new Error("Function not implemented.");
          }}
          value={0}
        />
      </Stack>
    </Paper>
  );
}
