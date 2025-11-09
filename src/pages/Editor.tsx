import { InventoryGrid } from "./Inventory";
import { ItemEditor } from "./ItemEditor";
import { Stack } from "@mui/material";
import { useAppSelector } from "../StoreContext";

interface EditorProps {
}

export function Editor({ }: EditorProps) {
  const { saveData } = useAppSelector(s => s.common);
  return (
      <Stack
        width={"100%"}
        height={"100%"}
        sx={{
          backgroundImage: "url(background.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        overflow={"hidden"}
        p={2}
        flex={1}
        spacing={2}
        alignItems={"flex-start"}
        justifyContent={"center"}
        direction={"row"}
      >
        <InventoryGrid/>
      </Stack>
  );
}
