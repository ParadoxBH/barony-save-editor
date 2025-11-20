import React from "react";
import { Stack } from "@mui/material";
import { InputSlider } from "../components/InputSlider";
import { InputNumber } from "../components/InputNumber";
import type { Player, PlayerStats } from "../utils/EditorDefinition";
import { useLanguage } from "../components/language";
import { setPlayerStats, useAppDispatch } from "../StoreContext";

interface CharacterAttributsProps {
  player?: Player;
}

export function CharacterAttributs({ player }: CharacterAttributsProps) {
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
    <>
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
          onChange={onChange}
          labelValue={(value) =>
            `${Math.round((value / (player?.stats.maxHP || 0)) * 100)}%`
          }
        />
        <InputNumber
          fullWidth
          name={"maxHP"}
          value={player?.stats.maxHP}
          min={1}
          sx={{ width: 100 }}
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
          onChange={onChange}
          labelValue={(value) =>
            `${Math.round((value / (player?.stats.maxMP || 0)) * 100)}%`
          }
        />
        <InputNumber
          fullWidth
          name={"maxMP"}
          value={player?.stats.maxMP}
          min={1}
          sx={{ width: 100 }}
          onChange={handleUpdateMaxMP}
        />
      </Stack>
      <InputSlider
        label={language.get("player_stats_xp")}
        name={"EXP"}
        value={player?.stats.EXP || 0}
        min={0}
        max={100}
        onChange={onChange}
        labelValue={(value) => `${value}%`}
      />
      <InputSlider
        label={language.get("player_stats_hunger")}
        name={"HUNGER"}
        value={player?.stats.HUNGER || 0}
        min={0}
        max={1000}
        onChange={onChange}
        labelValue={(value) => `${Math.round(value / 10)}%`}
      />
      <Stack spacing={2} alignItems={"center"} direction={"row"}>
        <InputNumber
          fullWidth
          label={language.get("player_stats_lvl")}
          name={"LVL"}
          value={player?.stats.LVL}
          min={1}
          onChange={onChange}
        />
        <InputNumber
          fullWidth
          label={language.get("player_stats_gold")}
          name={"GOLD"}
          min={0}
          value={player?.stats.GOLD}
          onChange={onChange}
        />
      </Stack>
    </>
  );
}
