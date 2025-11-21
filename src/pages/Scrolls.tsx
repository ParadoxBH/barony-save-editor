import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import {
  getCharacter,
  setPlayerScrolls,
  useAppSelector,
} from "../StoreContext";
import { useLanguage } from "../components/language";
import { ItemIcon, ItemSlot } from "../components/ItemSlot";
import { TabWindow } from "../components/TabWindow";
import { Icon } from "../components/Icon";
import { Chip } from "../components/Chip";
import type { RecipeUnlockable, Unlockable } from "../utils/EditorDefinition";
import { useDispatch } from "react-redux";

const books: { name: string; item: number; color: number }[] = [
  { name: "zelgo mer", item: 79, color: 0 },
  { name: "juyed awk yacc", item: 77, color: 1 },
  { name: "nr 9", item: 80, color: 2 },
  { name: "nobary robyan", item: 81, color: 3 },
  { name: "pratyavayan", item: 79, color: 4 },
  { name: "daiyen fooels", item: 75, color: 0 },
  { name: "lep gex ven zea", item: 70, color: 1 },
  { name: "prirutsenie", item: 274, color: 2 },
  { name: "elbib yloh", item: 69, color: 3 },
  { name: "verr yed horre", item: 75, color: 4 },
  { name: "venzar borgavve", item: 79, color: 0 },
  { name: "tharr", item: 80, color: 1 },
  { name: "yum yum", item: 69, color: 2 },
  { name: "kernod wel", item: 76, color: 3 },
  { name: "elam ebow", item: 78, color: 4 },
  { name: "duam xnaht", item: 72, color: 0 },
  { name: "kirje", item: 286, color: 1 },
  { name: "ve forbryderne", item: 75, color: 2 },
  { name: "hackem muche", item: 70, color: 3 },
  { name: "velox neb", item: 76, color: 4 },
  { name: "foobie bletch", item: 74, color: 0 },
  { name: "temov", item: 68, color: 1 },
  { name: "garven deh", item: 81, color: 2 },
  { name: "read me", item: 73, color: 3 },
];

interface ItemProps {
  scrollId: number;
  selected?: boolean;
  onClick: (unlocked: Unlockable) => void;
}
function Item({ scrollId, selected, onClick }: ItemProps) {
  const size = 32;
  return (
    <Grid size={4} key={`speel_${scrollId}`}>
      <Button
        fullWidth
        variant={selected ? "contained" : "outlined"}
        onClick={() => onClick({ type: scrollId, unlocked: !selected })}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flex={1}
        >
          <ItemSlot item={{ type: books[scrollId].item, identified: true }} />
          <Typography flex={1}>
            {books[scrollId].name.toUpperCase()}
          </Typography>
        </Stack>
      </Button>
    </Grid>
  );
}

export function Scrolls() {
  const character = getCharacter();
  const dispatch = useDispatch();
  const language = useLanguage();
  const count = Object.values(character?.scrolls || {}).filter(
    (s) => s.unlocked
  ).length;

  function handleSetScrolls(unlocked: Unlockable) {
    if (!character) return;
    const scrolls = { ...character.scrolls };
    scrolls[unlocked.type] = unlocked;
    dispatch(setPlayerScrolls(scrolls));
  }

  function handleFullSet() {
    if (!character) return;
    if (
      Object.values(character.scrolls).filter((s) => s.unlocked).length ===
      books.length
    )
      dispatch(setPlayerScrolls({}));
    else
      dispatch(
        setPlayerScrolls(
          books.reduce((result, s, index) => {
            result[index] = { type: index, unlocked: true };
            return result;
          }, {} as RecipeUnlockable)
        )
      );
  }

  return (
    <TabWindow
      label={language.get("tab_scrolls")}
      startIcon={<Icon name="tabs/scrolls" size={32} />}
      width={600}
      actions={<Chip color={"info"} label={`${count}/${books.length}`} onClick={handleFullSet}/>}
    >
      <Grid container spacing={0.5}>
        {books.map((speel, index) => (
          <Item
            scrollId={index}
            selected={
              character &&
              index in character.scrolls &&
              character.scrolls[index].unlocked
            }
            onClick={handleSetScrolls}
          />
        ))}
      </Grid>
    </TabWindow>
  );
}
