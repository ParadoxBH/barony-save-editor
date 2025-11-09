import { InventoryGrid } from "./Inventory";
import { ItemEditor } from "./ItemEditor";
import { Stack } from "@mui/material";
import { useAppSelector } from "../StoreContext";

interface EditorProps {}

export function Editor({}: EditorProps) {
  return (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
      <InventoryGrid />
    </Stack>
  );
}
