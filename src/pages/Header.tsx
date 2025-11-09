import React, { useState } from "react";
import { Icon } from "../components/Icon";
import {
  Divider,
  Stack,
  Typography,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import type { SaveData } from "../components/SaveDefinition";
import {
  setSaveData,
  useAppSelector,
  useAppDispatch,
  setPlayerSelected,
} from "../StoreContext";

const TAB_INVENTORY = 0;

export function Header() {
  const { tab, setTab, saveData, saveName, playerSelected } = useAppSelector(
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

  return (
    <>
      <Stack
        direction={"row"}
        sx={{ backgroundColor: "#1976d2", color: "white", p: 1, pl: 2, pr: 2 }}
        justifyContent={"space-between"}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Icon name="logo" size={36} />
          <Typography variant="h4" sx={{ color: "white" }}>
            Barony Save Editor
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack alignItems={"start"}>
            <Typography variant="subtitle2">Arquivo Carregado:</Typography>
            <Chip
              sx={{ backgroundColor: "rgba(255,255,255,0.5)", minWidth: 300 }}
              label={saveName || "Nenhum Arquivo"}
              size="small"
            />
          </Stack>
          <Button component="label" color={"success"} variant="contained">
            <Typography>Abrir Arquivo</Typography>
            <input
              type="file"
              style={{ display: "none" }}
              accept=".baronysave"
              onChange={handleFileUpload}
            />
          </Button>
          <Button
            onClick={handleDownload}
            color={"inherit"}
            variant="contained"
            disabled={!saveData}
          >
            <Typography>Baixar Arquivo</Typography>
          </Button>
        </Stack>
      </Stack>

      {/* Conteúdo Principal */}
      <Stack
        pl={2}
        pr={2}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Tabs
            value={tab}
            onChange={(e, value) => dispatch(setTab(value))}
            aria-label="basic tabs example"
          >
            <Tab label="Inventario" value={TAB_INVENTORY} />
          </Tabs>
        </Stack>
        <Stack direction="row" spacing={2} alignItems={"center"}>
          <Typography sx={{ color: "#666" }}>
            🎮 Game: {saveData?.game_name || "?"}
          </Typography>
          <Typography sx={{ color: "#666" }}>
            📦 Versão: {saveData?.game_version || "?"}
          </Typography>
          <Typography sx={{ color: "#666" }}>
            ⚔️ Nivel da Masmorra: {saveData?.dungeon_lvl || "?"}
          </Typography>
          <Typography sx={{ color: "#666" }}>
            👥 Jogadores:{" "}
            {saveData?.players_connected.filter((p) => p === 1).length || "?"}
          </Typography>
          {saveData && (
            <>
              <Divider orientation="vertical" flexItem />
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
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
}
