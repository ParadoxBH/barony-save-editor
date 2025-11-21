import {
  Checkbox,
  lighten,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLanguage } from "../components/language";
import { TabWindow } from "../components/TabWindow";
import { recipes } from "./RecipesCrafts";
import { itemEffectIcon, ItemSlot } from "../components/ItemSlot";
import {
  getCharacter,
  setPlayerRecipes,
  useAppDispatch,
  useAppSelector,
} from "../StoreContext";
import { useMemo, useState } from "react";
import {
  InputSelection,
  type InputSelectionOptions,
} from "../components/InputSelection";
import { Icon } from "../components/Icon";
import type { Player, RecipeUnlockable } from "../utils/EditorDefinition";

const ingredientSize = 100;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(0.5),
    margin: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: theme.spacing(0.5),
    margin: 0,
  },
}));

const StyledTableRow = styled(TableRow)<{ checked?: boolean }>(
  ({ theme, checked }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: checked
        ? lighten(theme.palette.primary.light, 0.5)
        : theme.palette.action.hover,
    },
    "&:nth-of-type(even)": {
      backgroundColor: checked
        ? lighten(theme.palette.primary.light, 0.5)
        : "transparent",
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
    padding: theme.spacing(0.5),
    margin: 0,
    // Opcional: adicionar uma cor de fundo geral quando checked
    ...(checked && {
      backgroundColor: lighten(theme.palette.primary.light, 0.5),
      "&:hover": {
        backgroundColor: lighten(theme.palette.primary.light, 0.6),
      },
    }),
  })
);

interface ItemProps {
  recipeId: number;
  player?: Player;
  onClick: (id: number, unlocked: boolean) => void;
}

function Item({ recipeId, player, onClick }: ItemProps) {
  const recipe = recipes[recipeId];
  const isChecked = player && recipeId in (player.recipes || {}) ? player.recipes[recipeId].unlocked : false;

  return (
    <StyledTableRow checked={isChecked}>
      <StyledTableCell>
        <Checkbox
          checked={isChecked}
          onChange={(e, checked) => onClick(recipeId, checked)}
        />
      </StyledTableCell>
      <StyledTableCell>
        <ItemSlot showInf item={{ type: recipeId, identified: true }} />
      </StyledTableCell>
      <StyledTableCell width={ingredientSize}>
        <Stack alignItems={"center"} spacing={0.5}>
          {recipe
            .filter(
              (usuario, index, self) =>
                index === self.findIndex((u) => u.first === usuario.first)
            )
            .map((r, index) => (
              <ItemSlot
                key={`recipe_${recipeId}_first_${index}`}
                item={{ type: r.first, identified: true }}
              />
            ))}
        </Stack>
      </StyledTableCell>
      <StyledTableCell width={ingredientSize}>
        <Stack alignItems={"center"} spacing={0.5}>
          {recipe
            .filter(
              (usuario, index, self) =>
                index === self.findIndex((u) => u.second === usuario.second)
            )
            .map((r, index) => (
              <ItemSlot
                key={`recipe_${recipeId}_second_${index}`}
                item={{ type: r.second, identified: true }}
              />
            ))}
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export function Recipes() {
  const [filterFirst, setFilterFirst] = useState<number | undefined>(undefined);
  const [filterSecondary, setFilterSecondary] = useState<number | undefined>(
    undefined
  );
  const language = useLanguage();
  const player = getCharacter();
  const dispatch = useAppDispatch();
  const { itens } = useAppSelector((s) => s.common);
  const { filterOptionsBase, filterOptionsSecondary } = useMemo(
    () => getFilters(),
    [] // só recalcula quando recipes mudar
  );
  const recipeUnlockedCount = Object.values(player?.recipes || {}).filter(
    (r) => r.unlocked
  ).length;
  const recipeAllUnlocked =
    recipeUnlockedCount === Object.values(recipes).length;

  function getFilter(id: number) {
    const currentItem = id in itens ? itens[id] : undefined;
    return {
      icon: `potions/${itemEffectIcon[id]}`,
      label: language.getItem(currentItem?.name, true),
      value: id,
    };
  }

  function getFilters() {
    const baseMap: number[] = [];
    const secondaryMap: number[] = [];

    for (const itemId of Object.keys(recipes)) {
      for (const recipe of recipes[parseInt(itemId)]) {
        if (!baseMap.includes(recipe.first)) baseMap.push(recipe.first);
        if (!secondaryMap.includes(recipe.second))
          secondaryMap.push(recipe.second);
      }
    }

    return {
      filterOptionsBase: [
        { label: language.get("ui_all") },
        ...baseMap.map(getFilter),
      ] as InputSelectionOptions,
      filterOptionsSecondary: [
        { label: language.get("ui_all") },
        ...secondaryMap.map(getFilter),
      ] as InputSelectionOptions,
    };
  }

  function filterRecipes(item: string) {
    const recipe = recipes[parseInt(item)];
    return (
      (!filterFirst || !!recipe.find((r) => r.first === filterFirst)) &&
      (!filterSecondary || !!recipe.find((r) => r.second === filterSecondary))
    );
  }

  function handleSetAllRecipes() {
    dispatch(
      setPlayerRecipes(
        recipeAllUnlocked
          ? {}
          : Object.keys(recipes).reduce((result, recipe) => {
              const id = parseInt(recipe);
              result[id] = { unlocked: true, type: id };
              return result;
            }, {} as RecipeUnlockable)
      )
    );
  }

  function handleSetRecipes(id: number, unlocked: boolean) {
    if (player === undefined) return;
    const playerRecipes = { ...player.recipes };
    playerRecipes[id] = { type: id, unlocked: unlocked };
    dispatch(setPlayerRecipes(playerRecipes));
  }

  return (
    <TabWindow
      startIcon={<Icon name="tabs/recipes" size={32} />}
      label={language.get("tab_recipes")}
      width={600}
      actions={
        <>
          <InputSelection
            name={"base"}
            label={language.get("recipes_base")}
            value={filterFirst}
            onChange={setFilterFirst}
            options={filterOptionsBase}
            sx={{ root: { minWidth: 150 } }}
          />
          <InputSelection
            name={"secondary"}
            label={language.get("recipes_secondary")}
            value={filterSecondary}
            onChange={setFilterSecondary}
            options={filterOptionsSecondary}
            sx={{ root: { minWidth: 150 } }}
          />
        </>
      }
    >
      <Table aria-label="customized table" stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Checkbox
                checked={recipeAllUnlocked}
                indeterminate={!recipeAllUnlocked && recipeUnlockedCount > 0}
                onChange={handleSetAllRecipes}
              />
            </StyledTableCell>
            <StyledTableCell>{language.get("recipes_result")}</StyledTableCell>
            <StyledTableCell align="center" width={ingredientSize}>
              {language.get("recipes_base")}
            </StyledTableCell>
            <StyledTableCell align="center" width={ingredientSize}>
              {language.get("recipes_secondary")}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(recipes)
            .filter(filterRecipes)
            .map((recipe) => (
              <Item
                key={`recipe_${recipe}`}
                recipeId={parseInt(recipe)}
                player={player}
                onClick={handleSetRecipes}
              />
            ))}
        </TableBody>
      </Table>
    </TabWindow>
  );
}
