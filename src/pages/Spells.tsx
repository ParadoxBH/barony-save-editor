import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import {
  getCharacter,
  setPlayerSpeel,
  speelLimit,
  useAppDispatch,
  useAppSelector,
} from "../StoreContext";
import { useLanguage } from "../components/language";
import { ITEMID_SPELL } from "./Inventory";
import { ItemIcon } from "../components/ItemSlot";
import { Chip } from "../components/Chip";

interface ItemProps {
  speelId: number;
  image: string;
}
function Item({ speelId, image }: ItemProps) {
  const character = getCharacter();
  const dispatch = useAppDispatch();
  const speel =
    speelId in (character?.spells || {})
      ? character?.spells[speelId] || { type: speelId, unlocked: false }
      : { type: speelId, unlocked: false };
  const language = useLanguage();
  const size = 32;
  return (
    <Grid size={4} key={`speel_${speelId}`}>
      <Button
        fullWidth
        variant={speel.unlocked ? "contained" : "outlined"}
        onClick={() =>
          dispatch(setPlayerSpeel({ type: speelId, unlocked: !speel.unlocked }))
        }
      >
        <Stack direction={"row"} alignItems={"center"}>
          <Box sx={{ width: size, height: size }}>
            <ItemIcon image={image} />
          </Box>
          <Typography>{language.getSpell(speelId).name}</Typography>
        </Stack>
      </Button>
    </Grid>
  );
}

export function Spells() {
  const { itens } = useAppSelector((s) => s.common);
  const character = getCharacter();
  const language = useLanguage();
  const count = Object.values(character?.spells || {}).filter(s => s.unlocked).length;

  function getSpeels() {
    const result: {id: number, image: string}[] = [];
    const images = itens[ITEMID_SPELL].item_images;
    const excludeList = [0, 53, 54];
    for(const i in images)
    {
      const id = parseInt(i);
      if(excludeList.includes(id))
        continue;
      result.push({id: id, image: images[id]})
    }
    return result;
  }

  return (
    <Box maxHeight={"100%"} display={"flex"}>
      <Paper elevation={3} sx={{ display: "flex" }}>
        <Stack p={3} alignItems={"center"} spacing={2}>
          <Stack direction={"row"} alignItems={"center"} spacing={4}>
            <Typography variant="h6" gutterBottom>
              {language.get("tab_spells")}
            </Typography>
            <Chip label={`${count}/${speelLimit}`}/>
          </Stack>
          <Box flex={1} width={600} overflow={"auto"}>
            <Grid container spacing={0.5}>
              {getSpeels().map(speel => (
                <Item speelId={speel.id} image={speel.image} />
              ))}
            </Grid>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
