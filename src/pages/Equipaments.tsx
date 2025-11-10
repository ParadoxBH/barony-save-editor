import { Paper, Box, Stack, Typography } from "@mui/material";
import { ItemSlot, getSlotColor } from "../components/ItemSlot";
import { getCharacter } from "../StoreContext";
import type { EquipmentSlotFirst } from "../utils/EditorDefinition";
import { ItemSelectionDialog } from "../components/ItemSelectionDialog";
import { useState } from "react";

export function Equipaments() {
  const character = getCharacter();
  const [slotEdit, setSlotEdit] = useState<string | undefined>(undefined);

  const slotsL: EquipmentSlotFirst[] = [
    "mask",//
    "cloak",//
    "amulet",//
    "ring",//
    "shield",//
  ];

  const slotsR: EquipmentSlotFirst[] = [
    "helmet",//
    "breastplate",//
    "gloves",//
    "shoes",
    "weapon",//
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
                item={character?.equipment[s] || null}
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
                item={character?.equipment[s] || null}
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
