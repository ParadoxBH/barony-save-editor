import { Stack, Typography, type SxProps } from "@mui/material";
import type { Player } from "../utils/EditorDefinition";
import { theme } from "../theme";
import { Icon } from "../components/Icon";
import type { ReactNode } from "react";
import { useLanguage } from "../components/language";


const RACE_HUMAN = 0;
const RACE_SUCCUBUS = 3;
const RACE_INCUBUS = 6;

const SEX_M = 0;
const SEX_F = 1;

interface CharacterRaceProps {
  player?: Player;
}

const classes = [
  //53485348 original.txt
  "Barbarian",
  "Warrior",
  "Healer",
  "Rogue",
  "Wanderer",
  "Cleric",
  "Merchant",
  "Wizard",
  "Arcanist",
  "Joker",
  "Sexton",
  "Ninja",
  "Monk",

  "Conjurer",
  "Accursed",
  "Mesmer",
  "Brewer",

  "Mechanist",
  "Punisher",
  "Shaman",
  "Hunter",
];

const raceSexVariant = [5];
const races = [
  //5369 original.txt
  "Human",

  "Skeleton",
  "Vampire",
  "Succubus",
  "Goatman",

  "Automaton",
  "Incubus",
  "Goblin",
  "Insectoid",
  //bug ?
  "ShamanMouse",
  "ShamanTol",
  "ShamanSpider",
  "ShamanImp",
];

const humanStyle = [
  "Landguard",
  "Northborn",
  "Firebrand",
  "Hardbred",
  "Highwatch",
  "Gloomforge",
  "Pyrebloom",
  "SnaKestone",
  "Windclan",
  "Warblood",
  "Millbound",
  "Sunstalk",
  "Claymount",
  "Stormward",
  "Tradefell",
  "Nighthill",
  "Baytower",
  "Whetsong",
];

interface ButtonProps {
  children?: ReactNode;
  selected?: boolean;
  sx?: SxProps;
}

function Button({ children, selected, sx }: ButtonProps) {
  return (
    <Stack
      sx={{
        background: selected ? theme.palette.primary.main : "rgba(0,0,0,0.1)",
        flex: 1,
        minWidth: "auto",
        borderRadius: theme.spacing(0.5),
        p: 0.5,
        pl: 2,
        pr: 2,
        ...sx,
      }}
      alignItems={"center"}
      justifyContent={"space-between"}
      direction={"row"}
      spacing={1}
    >
      {children}
    </Stack>
  );
}

export function getRaceIcon(char: { race: number; sex: number; type: number }) {
  if (char.race === RACE_HUMAN)
    return `races/Icon_${humanStyle[char.type % humanStyle.length]}${
      char.sex === 0 ? "M" : "F"
    }_00`;
  if (char.race === RACE_SUCCUBUS || char.race === RACE_INCUBUS)
    return `races/Icon_${races[char.race]}_00`;
  return `races/Icon_${races[char.race]}${char.sex === 0 ? "M" : "F"}_00`;
}

export function CharacterRace({ player }: CharacterRaceProps) {
  const language = useLanguage();
  return (
    <>
      <Stack spacing={0.5} direction={"row"} flex={1} alignItems={"stretch"}>
        <Stack flex={1}>
          <Typography variant="subtitle2" color="rgba(0,0,0,0.5)">{language.get("player_race")}</Typography>
          <Button sx={{ flex: 1 }}>
            <Icon
              name={getRaceIcon(player || { race: 0, sex: 0, type: 0 })}
              size={32}
            />
            <Typography>
              {player?.race === RACE_HUMAN
                ? humanStyle[(player?.type || 0) % humanStyle.length]
                : language.get(`player_race_${races[player?.race || 0]}`)}
            </Typography>
          </Button>
        </Stack>
        <Stack flex={1}>
          <Typography variant="subtitle2" color="rgba(0,0,0,0.5)">{language.get("player_class")}</Typography>
          <Button sx={{ flex: 1 }}>
            <Icon
              name={`classe/ClassSelect_Icon_${
                classes[player?.class || 0]
              }On_00`}
              size={32}
            />
            <Typography>{language.get(`player_class_${classes[player?.class || 0]}`)}</Typography>
          </Button>
        </Stack>
        <Stack>
          <Typography variant="subtitle2" color="rgba(0,0,0,0.5)">{language.get("player_sex")}</Typography>
          <Stack spacing={0.5} direction={"row"} flex={1}>
            {player?.race !== RACE_SUCCUBUS && (
              <Button selected={player?.sex === SEX_M}>
                <Icon
                  name={`HUD_CharSheet_Sex_${
                    raceSexVariant.includes(player?.race || 0)
                      ? races[player?.race || 0]
                      : ""
                  }M_02`}
                />
              </Button>
            )}
            {player?.race !== RACE_INCUBUS && (
              <Button selected={player?.sex === SEX_F}>
                <Icon
                  name={`HUD_CharSheet_Sex_${
                    raceSexVariant.includes(player?.race || 0)
                      ? races[player?.race || 0]
                      : ""
                  }F_02`}
                />
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
