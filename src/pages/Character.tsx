import React from "react";
import { Stack } from "@mui/material";
import type { Player } from "../utils/EditorDefinition";
import { useLanguage } from "../components/language";
import { TabWindow } from "../components/TabWindow";
import { CharacterStats } from "./CharacterStats";
import { CharacterAttributs } from "./CharacterAttributs";
import { CharacterRace } from "./CharacterRace";

interface CharacterProps {
  player?: Player;
}

// Componente principal do inventário
export const Character: React.FC<CharacterProps> = ({ player }) => {
  const language = useLanguage();

  return (
    <TabWindow label={language.get("tab_character")} width={450}>
      <Stack spacing={0.5}>
        <CharacterRace player={player} />
        <CharacterStats player={player} />
        <CharacterAttributs player={player} />
      </Stack>
    </TabWindow>
  );
};
