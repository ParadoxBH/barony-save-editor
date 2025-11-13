import { Paper, Box, Stack, Typography } from "@mui/material";
import { ItemSlot, getSlotColor } from "../components/ItemSlot";
import { getCharacter, setPlayerEquipament, useAppDispatch } from "../StoreContext";
import type { EquipmentSlotFirst, Item } from "../utils/EditorDefinition";
import { useState } from "react";
import { genItemNull, ItemEditor } from "./ItemEditor";
import { useLanguage } from "../components/language";

export function Equipaments() {
  const character = getCharacter();
  const [slotEdit, setSlotEdit] = useState<string | undefined>(undefined);
  const [itemEdit, setItemEdit] = useState<Item | undefined>(undefined);
  const dispatch = useAppDispatch();
  const language = useLanguage();

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

  function handleOnEdit(slot: string)
  {
    setSlotEdit(slot);
    setItemEdit(character && slot in character?.equipment ? character?.equipment[slot] : genItemNull())
  }

  function handleDeleteItem()
  {
    if(character && slotEdit)
    {
      const equipment = {...character.equipment};
      delete equipment[slotEdit];
      dispatch(setPlayerEquipament(equipment));
    }
    handleClose();
  }

  function handleChangeItem(item: Item)
  {
    if(character && slotEdit)
    {
      const equipment = {...character.equipment};
      equipment[slotEdit] = item;
      dispatch(setPlayerEquipament(equipment));
    }
    handleClose();
  }


  function handleClose()
  {
    setSlotEdit(undefined);
    setItemEdit(undefined);
  }

  return (
    <Paper elevation={3}>
      <Stack p={3} alignItems={"center"} spacing={2}>
        <Typography variant="h6" gutterBottom>
          {language.get("tab_equipment")}
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
                onClick={() => handleOnEdit(s)}
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
                onClick={() => handleOnEdit(s)}
              />
            ))}
          </Stack>
        </Stack>
        <ItemEditor 
          item={itemEdit}
          onChange={handleChangeItem}
          onClose={handleClose}
          onDelete={handleDeleteItem}
        />
      </Stack>
    </Paper>
  );
}
