import React from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import {
  getCharacter,
  setPlayerProficiencies,
  useAppDispatch,
} from "../StoreContext";
import { useLanguage } from "../components/language";
import { InputStatus } from "../components/InputStatus";
import { InputNumber } from "../components/InputNumber";
import { Icon } from "../components/Icon";
import { InputSlider } from "../components/InputSlider";

const map = [
  "tinkering",
  "stealth",
  "trading",
  "appraisal",
  "swimming",
  "leadership",
  "casting",
  "magic",
  "ranged",
  "swords",
  "maces",
  "axes",
  "polearms",
  "blocking",
  "unarmed",
  "alchemy",
];

const orderShow = [4, 1, 5, 13, 2, 8, 3, 14, 0, 9, 15, 12, 7, 11, 6, 10];

export function Proeficiencias() {
  const dispatch = useAppDispatch();
  const language = useLanguage();
  const player = getCharacter();
  const sliderMode = false; //ta bugado, entao vou deixar desligado por agora

  function handleUpdateStats(id: number, value: number) {
    dispatch(setPlayerProficiencies({ id, value }));
  }

  function getIconName(id: number, level?: number) {
    let name = id in map ? map[id][0].toUpperCase() + map[id].slice(1) : "Null";
    return `skillsheet/${name}02_32${level === 100 ? "Gold" : ""}`;
  }

  return (
    <Paper elevation={3}>
      <Box p={3}>
        <Stack spacing={1} alignItems={"stretch"}>
          <Stack alignItems={"center"}>
            <Typography variant="h6" gutterBottom>
              {language.get("tab_proficiencies")}
            </Typography>
          </Stack>
          <Stack spacing={0.5} alignItems={"center"} direction={"row"}>
            <Grid container spacing={0.5} columnSpacing={4} width={600}>
              {orderShow.map((id, index) => (
                <Grid size={6} key={`player_proficiencies_${map[id]}`}>
                  <Stack
                    direction={index % 2 == 0 ? "row" : "row-reverse"}
                    spacing={2}
                    alignItems={"center"}
                  >
                    <Icon
                      name={getIconName(id, player?.proficiencies[id])}
                      size={32}
                    />
                    {sliderMode && (
                      <InputSlider
                        value={player?.proficiencies[id] || 0}
                        name={`player_proficiencies_${map[id]}`}
                        label={language.get(`player_proficiencies_${map[id]}`)}
                        onChange={(e, value) => handleUpdateStats(id, value)}
                        min={0}
                        max={100}
                      />
                    )}
                    {!sliderMode && (
                      <>
                        <InputNumber
                          value={player?.proficiencies[id] || 0}
                          name={`player_proficiencies_${map[id]}`}
                          min={0}
                          max={100}
                          onChange={(e) =>
                            handleUpdateStats(id, e.target.value)
                          }
                        />
                        <Typography variant="subtitle2">
                          {language.get(`player_proficiencies_${map[id]}`)}
                        </Typography>
                      </>
                    )}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}
