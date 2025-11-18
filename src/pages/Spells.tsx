import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import {
  getCharacter,
  setPlayerSpeel,
  useAppDispatch,
  useAppSelector,
} from "../StoreContext";
import { useLanguage } from "../components/language";
import { ITEMID_SPELL } from "./Inventory";
import { ItemIcon } from "../components/ItemSlot";

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
  const language = useLanguage();

  return (
    <Box maxHeight={"100%"} display={"flex"}>
      <Paper elevation={3} sx={{ display: "flex" }}>
        <Stack p={3} alignItems={"center"} spacing={2}>
          <Typography variant="h6" gutterBottom>
            {language.get("tab_spells")}
          </Typography>
          <Box flex={1} width={600} overflow={"auto"}>
            <Grid container spacing={0.5}>
              {itens[ITEMID_SPELL].item_images.slice(1).map((image, index) => (
                <Item speelId={index + 1} image={image} />
              ))}
            </Grid>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
