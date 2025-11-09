import { InventoryGrid } from "./Inventory";
import { ItemEditor } from "./ItemEditor";
import { Stack } from "@mui/material";
import { TAB_INVENTORY, useAppSelector } from "../StoreContext";

interface EditorProps {}

export function Editor({}: EditorProps) {
  const { tab } = useAppSelector(s => s.common);
  return (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
      {tab === TAB_INVENTORY && <InventoryGrid />}
    </Stack>
  );
}
