import React from "react";
import { Box, Paper, Stack, TextField, Typography } from "@mui/material";
import {
  setPlayerStats,
  useAppDispatch,
} from "../StoreContext";
import type { Player, PlayerStats } from "../utils/EditorDefinition";
import { useLanguage } from "../components/language";
import { InputStatus } from "../components/InputStatus";
import { InputSlider } from "../components/InputSlider";

interface CharacterProps {
  player?: Player;
}

// Componente principal do inventário
export const Character: React.FC<CharacterProps> = ({ player }) => {
  const dispatch = useAppDispatch();
  const language = useLanguage();

  function handleUpdateStats(event: {
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

  function handleUpdateMaxHP(event: {
    target: {
      name: string;
      value: number;
    };
  }) {
    if (!player) return;
    var stats: PlayerStats = { ...player.stats };
    stats.maxHP = event.target.value;
    stats.HP = Math.floor((player.stats.HP / player.stats.maxHP) * stats.maxHP);
    dispatch(setPlayerStats(stats));
  }

  function handleUpdateMaxMP(event: {
    target: {
      name: string;
      value: number;
    };
  }) {
    if (!player) return;
    var stats: PlayerStats = { ...player.stats };
    stats.maxMP = event.target.value;
    stats.MP = Math.floor((player.stats.MP / player.stats.maxMP) * stats.maxMP);
    dispatch(setPlayerStats(stats));
  }

  return (
    <Paper elevation={3}>
      <Box p={3}>
        <Stack spacing={1} alignItems={"stretch"}>
          <Stack alignItems={"center"}>
            <Typography variant="h6" gutterBottom>
              {language.get("tab_character")}
            </Typography>
          </Stack>
          <Stack spacing={0.5} alignItems={"center"} direction={"row"}>
            <InputStatus
              label={language.get("player_stats_str")}
              value={player?.stats.STR}
              name="STR"
              onChange={handleUpdateStats}
            />
            <InputStatus
              label={language.get("player_stats_dex")}
              value={player?.stats.DEX}
              name="DEX"
              onChange={handleUpdateStats}
            />
            <InputStatus
              label={language.get("player_stats_con")}
              value={player?.stats.CON}
              name="CON"
              onChange={handleUpdateStats}
            />
            <InputStatus
              label={language.get("player_stats_int")}
              value={player?.stats.INT}
              name="INT"
              onChange={handleUpdateStats}
            />
            <InputStatus
              label={language.get("player_stats_per")}
              value={player?.stats.PER}
              onChange={handleUpdateStats}
            />
            <InputStatus
              label={language.get("player_stats_chr")}
              value={player?.stats.CHR}
              onChange={handleUpdateStats}
            />
          </Stack>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            flex={1}
            direction={"row"}
            spacing={4}
          >
            <InputSlider
              label={language.get("player_stats_hp")}
              name={"HP"}
              value={player?.stats.HP || 0}
              min={0}
              max={player?.stats.maxHP || 0}
              onChange={handleUpdateStats}
              labelValue={(value) =>
                `${Math.round((value / (player?.stats.maxHP || 0)) * 100)}%`
              }
            />
            <TextField
              fullWidth
              name={"maxHP"}
              type="number"
              value={player?.stats.maxHP || 0}
              margin="normal"
              size="small"
              inputProps={{ min: 1 }}
              sx={{ width: 100 }}
              //@ts-ignore
              onChange={handleUpdateMaxHP}
            />
          </Stack>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            flex={1}
            direction={"row"}
            spacing={4}
          >
            <InputSlider
              label={language.get("player_stats_mp")}
              name={"MP"}
              value={player?.stats.MP || 0}
              min={0}
              max={player?.stats.maxMP || 0}
              onChange={handleUpdateStats}
              labelValue={(value) =>
                `${Math.round((value / (player?.stats.maxMP || 0)) * 100)}%`
              }
            />
            <TextField
              fullWidth
              name={"maxMP"}
              type="number"
              value={player?.stats.maxMP || 0}
              margin="normal"
              size="small"
              inputProps={{ min: 1 }}
              sx={{ width: 100 }}
              //@ts-ignore
              onChange={handleUpdateMaxMP}
            />
          </Stack>
          <InputSlider
            label={language.get("player_stats_xp")}
            name={"EXP"}
            value={player?.stats.EXP || 0}
            min={0}
            max={100}
            onChange={handleUpdateStats}
            labelValue={(value) => `${value}%`}
          />
          <InputSlider
            label={language.get("player_stats_hunger")}
            name={"HUNGER"}
            value={player?.stats.HUNGER || 0}
            min={0}
            max={1000}
            onChange={handleUpdateStats}
            labelValue={(value) => `${Math.round(value / 10)}%`}
          />
          <Stack spacing={2} alignItems={"center"} direction={"row"}>
            <TextField
              fullWidth
              label={language.get("player_stats_lvl")}
              name={"LVL"}
              type="number"
              value={player?.stats.LVL || 0}
              margin="normal"
              size="small"
              inputProps={{ min: 1 }}
              //@ts-ignore
              onChange={handleUpdateStats}
            />
            <TextField
              fullWidth
              label={language.get("player_stats_gold")}
              name={"GOLD"}
              type="number"
              value={player?.stats.GOLD || 0}
              margin="normal"
              size="small"
              //@ts-ignore
              onChange={handleUpdateStats}
            />
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};
