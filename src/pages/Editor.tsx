import { InventoryGrid } from "./Inventory";
import { ItemEditor } from "./ItemEditor";
import { Stack } from "@mui/material";
import { TAB_EQUIPAMENT, TAB_INVENTORY, useAppSelector } from "../StoreContext";
import { Equipaments } from "./Equipaments";

interface EditorProps {}

export function Editor({}: EditorProps) {
  const { tab } = useAppSelector(s => s.common);
  return (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
      {tab === TAB_INVENTORY && <InventoryGrid />}
      {tab === TAB_EQUIPAMENT && <Equipaments/>}
    </Stack>
  );
}
