import { InventoryGrid } from "./Inventory";
import { Stack } from "@mui/material";
import {
  getCharacter,
  TAB_PROFICIENCIES,
  TAB_CHARACTER,
  TAB_EQUIPAMENT,
  TAB_INVENTORY,
  TAB_SPELLS,
  useAppSelector,
  TAB_DUNGEON,
  TAB_RECIPES,
  TAB_SCROLLS,
} from "../StoreContext";
import { Equipaments } from "./Equipaments";
import { Character } from "./Character";
import { Spells } from "./Spells";
import { Proeficiencias } from "./Proeficiencias";
import { Dungeon } from "./Dungeon";
import { Recipes } from "./Recipes";
import { Scrolls } from "./Scrolls";

interface EditorProps {}

export function Editor({}: EditorProps) {
  const { tab } = useAppSelector((s) => s.common);
  const player = getCharacter();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      overflow={"hidden"}
      p={2}
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
      }}
      flex={1}
    >
      {tab === TAB_DUNGEON && <Dungeon />}
      {tab === TAB_CHARACTER && <Character player={player} />}
      {tab === TAB_PROFICIENCIES && <Proeficiencias />}
      {tab === TAB_INVENTORY && <InventoryGrid />}
      {tab === TAB_EQUIPAMENT && <Equipaments />}
      {tab === TAB_SPELLS && <Spells />}
      {tab === TAB_RECIPES && <Recipes />}
      {tab === TAB_SCROLLS && <Scrolls />}
    </Stack>
  );
}
