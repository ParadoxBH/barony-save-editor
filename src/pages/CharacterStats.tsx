import { Stack, Typography } from "@mui/material";
import { InputStatus } from "../components/InputStatus";
import { useLanguage } from "../components/language";
import { Icon } from "../components/Icon";
import type { Player, PlayerStats } from "../utils/EditorDefinition";
import { setPlayerStats, useAppDispatch } from "../StoreContext";

interface CharacterStatProps {
  player?: Player;
}

export function CharacterStats({ player }: CharacterStatProps) {
  const language = useLanguage();
  const dispatch = useAppDispatch();

  function onChange(event: {
    target: {
      name: string;
      value: number;
    };
  }) {
    if (!player) return;
    var stats: PlayerStats = { ...player.stats };
    //@ts-ignore
    stats[event.target.name] = event.target.value;
    dispatch(setPlayerStats(stats));
  }
  return (
    <>
      <Typography variant="subtitle2" color="rgba(0,0,0,0.5)">{language.get("player_stats")}</Typography>
      <Stack spacing={0.5} alignItems={"center"} direction={"row"}>
        <InputStatus
          label={language.get("player_stats_str")}
          value={player?.stats.STR}
          startIcon={<Icon name={"HUD_StatUp_STR_00"} />}
          name="STR"
          onChange={onChange}
          fullWidth
        />
        <InputStatus
          label={language.get("player_stats_dex")}
          value={player?.stats.DEX}
          startIcon={<Icon name={"HUD_StatUp_DEX_00"} />}
          name="DEX"
          onChange={onChange}
          fullWidth
        />
        <InputStatus
          label={language.get("player_stats_con")}
          value={player?.stats.CON}
          startIcon={<Icon name={"HUD_StatUp_CON_00"} />}
          name="CON"
          onChange={onChange}
          fullWidth
        />
        <InputStatus
          label={language.get("player_stats_int")}
          value={player?.stats.INT}
          startIcon={<Icon name={"HUD_StatUp_INT_00"} />}
          name="INT"
          onChange={onChange}
          fullWidth
        />
        <InputStatus
          label={language.get("player_stats_per")}
          value={player?.stats.PER}
          startIcon={<Icon name={"HUD_StatUp_PER_00"} />}
          name="PER"
          onChange={onChange}
          fullWidth
        />
        <InputStatus
          label={language.get("player_stats_chr")}
          value={player?.stats.CHR}
          startIcon={<Icon name={"HUD_StatUp_CHA_00"} />}
          name="CHR"
          onChange={onChange}
          fullWidth
        />
      </Stack>
    </>
  );
}
