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
import type { GameData } from "../utils/SaveDefinition";
import {
  setSaveData,
  useAppSelector,
  useAppDispatch,
  setPlayerSelected,
  TAB_INVENTORY,
  setTab,
  TAB_EQUIPAMENT,
} from "../StoreContext";
import { parseToEditor, parseToSave } from "../utils/ParserDefinition";
import { LanguageSelector, useLanguage } from "../components/language";

export function Header() {
  const { tab, saveData, saveName, playerSelected, itens, loading } =
    useAppSelector((s) => s.common);
  const dispatch = useAppDispatch();
  const language = useLanguage();
  const isLoading = Object.values(loading).find((l) => !l) !== undefined;

  const handleFileUpload = (event: any): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const result = e.target?.result;
          if (typeof result === "string") {
            const json: GameData = JSON.parse(result);
            dispatch(
              setSaveData({
                saveName: file.name,
                saveData: parseToEditor(itens, json),
              })
            );
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

    const dataStr = JSON.stringify(parseToSave(saveData), null, 4);
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
        {!isLoading && (
          <Stack direction="row" spacing={2}>
            <Stack alignItems={"start"}>
              <Typography variant="subtitle2">{`${language.get("file_name_label")}:`}</Typography>
              <Chip
                sx={{ backgroundColor: "rgba(255,255,255,0.5)", minWidth: 300 }}
                label={saveName || language.get("file_name_empty")}
                size="small"
              />
            </Stack>
            <Button
              component="label"
              color={"success"}
              variant="contained"
              sx={{ py: 0, px: 1 }}
            >
              <Typography fontSize={24} pr={1}>
                📥
              </Typography>
              <Typography>{language.get("load_file")}</Typography>
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
              sx={{ py: 0, px: 1 }}
            >
              <Typography fontSize={24} pr={1}>
                📤
              </Typography>
              <Typography>{language.get("get_file")}</Typography>
            </Button>
            <LanguageSelector/>
          </Stack>
        )}
      </Stack>

      {/* Conteúdo Principal */}
      {!isLoading && (
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
              <Tab label={language.get("tab_inventory")} value={TAB_INVENTORY} />
              <Tab label={language.get("tab_equipment")} value={TAB_EQUIPAMENT} />
            </Tabs>
          </Stack>
          <Stack direction="row" spacing={2} alignItems={"center"}>
            <Typography sx={{ color: "#666" }}>
              {`🎮 ${language.get("save_info_game")}: ${
                saveData?.save.game_name || "?"
              }`}
            </Typography>
            <Typography sx={{ color: "#666" }}>
              {`📦 ${language.get("save_info_version")}: ${
                saveData?.save.game_version || "?"
              }`}
            </Typography>
            <Typography sx={{ color: "#666" }}>
              {`⚔️ ${language.get("save_info_level")}: ${
                saveData?.save.dungeon_lvl || "?"
              }`}
            </Typography>
            <Typography sx={{ color: "#666" }}>
              {`👥 ${language.get("save_info_player_num")}: ${
                saveData?.save.players_connected.filter((p) => p === 1)
                  .length || "?"
              }`}
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
                      ? language.get("player_selector_value_empty")
                      : language.get("player_selector_label")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={playerSelected}
                    label={
                      playerSelected === undefined
                        ? language.get("player_selector_value_empty")
                        : language.get("player_selector_label")
                    }
                    error={playerSelected === undefined}
                    onChange={(e) =>
                      dispatch(setPlayerSelected(e.target.value))
                    }
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
                      <em>{language.get("player_selector_option_null")}</em>
                    </MenuItem>
                    {saveData?.players.map((p, index) => (
                      <MenuItem key={index} value={index}>
                        {(p.name || language.get("player_selector_option_empty")).replace("%s", (index+1).toString()) }
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
          </Stack>
        </Stack>
      )}
    </>
  );
}
