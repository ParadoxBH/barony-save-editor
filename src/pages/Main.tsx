import React, { useState } from "react";
import { Icon } from "../components/Icon";
import {
  Box,
  Divider,
  Stack,
  Typography,
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Editor } from "./Editor";
import type { SaveData } from "../components/SaveDefinition";
import {
  setSaveData,
  useAppSelector,
  useAppDispatch,
  setPlayerSelected,
} from "../StoreContext";

export function Main() {
  const { saveData, saveName, playerSelected } = useAppSelector(
    (s) => s.common
  );
  const dispatch = useAppDispatch();

  const handleFileUpload = (event: any): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const result = e.target?.result;
          if (typeof result === "string") {
            const json: SaveData = JSON.parse(result);
            dispatch(setSaveData({ saveName: file.name, saveData: json }));
          }
        } catch (error) {
          alert("Erro ao carregar arquivo: " + (error as Error).message);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDownload = (): void => {
    if (!saveData) {
      alert("Nenhum arquivo carregado para baixar!");
      return;
    }

    const dataStr = JSON.stringify(saveData, null, 4);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = saveName || "savegame_edited.baronysave";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const connectedPlayersCount =
    saveData?.players_connected.filter((p) => p === 1).length || 0;

  return (
    <Stack flex={1} sx={{ backgroundColor: "#f5f5f5" }}>
      {/* Header */}
      <Stack
        direction={"row"}
        sx={{ backgroundColor: "#1976d2", color: "white", padding: "16px" }}
        justifyContent={"space-between"}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Icon name="logo" size={36} />
          <Typography variant="h4" sx={{ color: "white" }}>
            Barony Save Editor
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: "#2e7d32",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
              borderStyle: "solid",
              borderWidth: 2,
            }}
          >
            <Typography>Abrir Arquivo</Typography>
            <input
              type="file"
              style={{ display: "none" }}
              accept=".baronysave"
              onChange={handleFileUpload}
            />
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: saveData ? "#1976d2" : "#ccc",
              borderColor: !saveData ? "#1976d2" : "#ccc",
              borderStyle: "solid",
              borderWidth: 2,
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: saveData ? "pointer" : "not-allowed",
            }}
            //variant="contained"
            onClick={handleDownload}
            //disabled={!saveData}
            color={"inherit"}
          >
            <Typography>Baixar Arquivo</Typography>
          </label>
        </Stack>
      </Stack>

      {/* Conteúdo Principal */}
      <Stack
        padding={2}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Typography>Arquivo Carregado:</Typography>
          <Chip label={saveName || "Nenhum Arquivo"} size="small" />
        </Stack>
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Typography sx={{ color: "#666" }}>
            🎮 Game: {saveData?.game_name}
          </Typography>
          <Typography sx={{ color: "#666" }}>
            📦 Versão: {saveData?.game_version}
          </Typography>
          <Typography sx={{ color: "#666" }}>
            ⚔️ Nível: {saveData?.dungeon_lvl}
          </Typography>
          <Typography sx={{ color: "#666" }}>
            👥 Jogadores: {connectedPlayersCount}
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel
              error={playerSelected === undefined}
              id="demo-simple-select-helper-label"
              sx={{
                transform: "translate(16px, 9px) scale(1)",
                "&.MuiInputLabel-shrink": {
                  transform: "translate(16px, -9px) scale(0.75)",
                },
              }}
            >
              {playerSelected === undefined
                ? "Selecione um Jogador"
                : "Jogador"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={playerSelected}
              label={
                playerSelected === undefined
                  ? "Selecione um Jogador"
                  : "Jogador"
              }
              error={playerSelected === undefined}
              onChange={(e) => dispatch(setPlayerSelected(e.target.value))}
              sx={{
                width: 250,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderWidth: "1px",
                },
                "& .MuiSelect-select": {
                  paddingTop: (theme) => theme.spacing(1),
                  paddingBottom: (theme) => theme.spacing(1),
                  paddingLeft: (theme) => theme.spacing(2),
                  paddingRight: (theme) => theme.spacing(2),
                  textAlign: "left",
                },
              }}
            >
              <MenuItem value={undefined}>
                <em>Nenhum</em>
              </MenuItem>
              {saveData?.players.map((p, index) => (
                <MenuItem key={index} value={index}>
                  {p.stats.name || `Jogador ${index}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      <Divider />
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          flex: 1,
        }}
      >
        <Editor />
      </Box>
    </Stack>
  );
}
