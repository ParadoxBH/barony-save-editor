import { Box, Button, Grid, Stack, Typography } from "@mui/material";
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
import { TabWindow } from "../components/TabWindow";
import { Icon } from "../components/Icon";
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
  const count = Object.values(character?.spells || {}).filter(
    (s) => s.unlocked
  ).length;

  function getSpeels() {
    const result: { id: number; image: string }[] = [];
    const images = itens[ITEMID_SPELL].item_images;
    const excludeList = [0, 53, 54];
    for (const i in images) {
      const id = parseInt(i);
      if (excludeList.includes(id)) continue;
      result.push({ id: id, image: images[id] });
    }
    return result;
  }

  return (
    <TabWindow
      label={language.get("tab_spells")}
      startIcon={<Icon name="tabs/spells" size={32} />}
      width={600}
      actions={
        <Chip
          color={
            count < speelLimit - Math.max(2, speelLimit / 3)
              ? "info"
              : count < speelLimit - Math.max(1, speelLimit / 5)
              ? "warning"
              : "error"
          }
          label={`${count}/${speelLimit}`}
        />
      }
      prefix={
        <Chip icon="ExclamationAnim00" color={"warning"} label={language.get("player_spell_warning").replace("%f", speelLimit.toString())}/>
      }
    >
      <Grid container spacing={0.5}>
        {getSpeels().map((speel) => (
          <Item speelId={speel.id} image={speel.image} />
        ))}
      </Grid>
    </TabWindow>
  );
}
