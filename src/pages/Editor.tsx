import { InventoryGrid } from "./Inventory";
import { Stack } from "@mui/material";
import { getCharacter, TAB_CHARACTER, TAB_EQUIPAMENT, TAB_INVENTORY, useAppSelector } from "../StoreContext";
import { Equipaments } from "./Equipaments";
import { Character } from "./Character";

interface EditorProps {}

export function Editor({}: EditorProps) {
  const { tab } = useAppSelector(s => s.common);
  const player = getCharacter();
  return (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
      {tab === TAB_CHARACTER && <Character player={player} />}
      {tab === TAB_INVENTORY && <InventoryGrid />}
      {tab === TAB_EQUIPAMENT && <Equipaments/>}
    </Stack>
  );
}
