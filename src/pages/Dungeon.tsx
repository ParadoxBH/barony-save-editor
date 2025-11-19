import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useLanguage } from "../components/language";
import { ItemIcon } from "../components/ItemSlot";
import { getLevelList, levels, type LevelList } from "./DungeonLevels";
import { useState } from "react";
import { setDungeon, useAppDispatch, useAppSelector } from "../StoreContext";
import { Chip } from "../components/Chip";

interface ItemProps {
  map: LevelList;
  selected?: boolean;
}

function Item({ map, selected }: ItemProps) {
  const language = useLanguage();
  const dispatch = useAppDispatch();
  const size = 162 / 2;

  function handleChangeLevel()
  {
    dispatch(setDungeon(map));
  }

  return (
    <Grid size={3}>
      <Button fullWidth variant={selected ? "contained" : "outlined"} onClick={handleChangeLevel}>
        <Stack direction={"column"} alignItems={"center"} spacing={1}>
          <Box sx={{ width: size, height: size, position: "relative" }}>
            <ItemIcon
              image={`savescreens/save_${map.name || "unknown"}00.png`}
              sx={{ backgroundSize: "cover", backgroundPosition: "center" }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 10,
                right: "50%",
                height: 0,
                width: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <Chip
                  color={map.secret ? "warning" : "primary"}
                  label={
                    map.level_start === Infinity
                      ? "???"
                      : `${map.level_start}`
                  }
                />
              </Box>
            </Box>
          </Box>
          <Stack alignItems={"center"} direction={"row"} spacing={2}>
            <Typography>{map.name}</Typography>
          </Stack>
        </Stack>
      </Button>
    </Grid>
  );
}

export function Dungeon() {
  const language = useLanguage();
  const { saveData } = useAppSelector((s) => s.common);
  const [maps, setMaps] = useState<LevelList[]>(getLevelList());
  return (
    <Box maxHeight={"100%"} display={"flex"}>
      <Paper elevation={3} sx={{ display: "flex" }}>
        <Stack p={3} alignItems={"center"} spacing={2}>
          <Typography variant="h6" gutterBottom>
            {language.get("tab_dungeon")}
          </Typography>
          <Box flex={1} width={600} overflow={"auto"}>
            <Grid container spacing={0.5}>
              {maps.map((map) => (
                <Item
                  key={`level_${map.level_start}_in_${map.level_start}`}
                  map={map}
                  selected={
                    saveData && saveData.dungeon.level >= map.level_start && saveData.dungeon.level <= map.level_end &&
                    map.secret === saveData?.dungeon.secret
                  }
                />
              ))}
            </Grid>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
