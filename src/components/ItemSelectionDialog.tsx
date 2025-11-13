import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  TextField,
  Box, // Para organizar os componentes de filtro
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Grid,
  Button,
} from "@mui/material";

// Assumindo que esta é a função que busca e mapeia todos os seus itens
// Importação de exemplo (mantenha a sua importação real):
import { ItemSlot } from "./ItemSlot";
import type { ItemDataMap } from "../pages/Inventory";
import { useAppDispatch, useAppSelector } from "../StoreContext";
import { TablePaginator, usePaginator } from "./TPaginator";
import { StyledDialog } from "./StyledDialog";
import { useLanguage } from "./language";

// --- Interfaces de Tipagem (Mantidas do original) ---

interface ItemStats {
  [key: string]: number;
}

interface ItemDetails {
  item_id: number;
  third_person_model_index: number;
  first_person_model_index: number;
  gold_value: number;
  weight_value: number;
  item_level: number;
  item_category: "ARMOR" | "WEAPON" | string;
  equip_slot: "offhand" | "mainhand" | string;
  item_images: string[];
  stats: ItemStats;
  tooltip: {
    type: string;
  };
}

type SelectedItem = ItemDetails & {
  name: string;
  key: string;
};

interface ItemSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectItem: (item: number) => void;
  value: number; // Propriedade não utilizada no filtro, mas mantida na interface
}

// Função utilitária para mapear dados, movida para fora do componente
const mapItems = (rawItems: ItemDataMap): SelectedItem[] => {
  return Object.entries(rawItems).map(([key, details]) => {
    const formattedName = key
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      name: formattedName,
      key: key,
      ...details,
    } as SelectedItem;
  });
};

export const ItemSelectionDialog: React.FC<ItemSelectionDialogProps> = ({
  open,
  onClose,
  onSelectItem,
  value,
}) => {
  // 1. Estados para os filtros
  const [filterText, setFilterText] = useState("");
  const [filterCategory, setFilterCategory] = useState("ALL"); // 'ALL' representa nenhuma filtragem
  const { itens } = useAppSelector((s) => s.common);
  const pages = usePaginator();
  const language = useLanguage();
  // 2. Processa os dados brutos APENAS UMA VEZ
  const allItems: SelectedItem[] = useMemo(() => {
    // A função getItemsMapped() é chamada aqui
    return mapItems(itens);
  }, []); // Dependências vazias para rodar apenas na montagem

  // 3. Obtém todas as categorias únicas para o menu de filtro
  const uniqueCategories = useMemo(() => {
    const categories = allItems.map((item) => item.item_category);
    return ["ALL", ...Array.from(new Set(categories))]; // Adiciona 'ALL' e remove duplicatas
  }, [allItems]);

  // 4. Lógica de Filtragem (usando useMemo para performance)
  const filteredItems = useMemo(() => {
    var filter = allItems.filter((item) => {
      const matchesName = item.name
        .toLowerCase()
        .includes(filterText.toLowerCase());

      const matchesCategory =
        filterCategory === "ALL" || item.item_category === filterCategory;

      return matchesName && matchesCategory;
    });
    pages.setCount(filter.length);
    return filter.slice(
      pages.info.page * pages.info.limite,
      (pages.info.page + 1) * pages.info.limite
    );
  }, [allItems, filterText, filterCategory, pages.info]);

  const handleItemClick = (item: SelectedItem) => {
    onSelectItem(item.key);
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      title={language.get("item_select")}
      preContainer={
        <>
          {/* Container de Filtros */}
          <Box sx={{ p: 2, display: "flex", gap: 2, alignItems: "center" }}>
            <ItemSlot
              item={value != undefined ? { type: value } : undefined}
              showInf
            />
            {/* Filtro por Nome */}
            <TextField
              label="Filtrar por Nome"
              variant="outlined"
              size="small"
              fullWidth
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />

            {/* Filtro por Tipo/Categoria */}
            <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="category-filter-label">Tipo</InputLabel>
              <Select
                labelId="category-filter-label"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                label={language.get("item_type_label")}
              >
                {uniqueCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category === "ALL" ? language.get("item_type_all") : language.get(`item_type_${category}`)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Divider />
        </>
      }
      postContainer={
        <>
          <Divider />
          <TablePaginator pages={pages} />
        </>
      }
    >
      <Grid container spacing={2} maxHeight={"60vh"}>
        {filteredItems.map((item) => (
          <Grid size={3} key={item.key}>
            <ListItem
              button
              onClick={() => handleItemClick(item)}
              sx={{
                backgroundColor:
                  item.item_id === value ? "primary.light" : undefined,
                color: item.item_id === value ? "white" : undefined,
                "&:hover": {
                  backgroundColor:
                    item.item_id === value
                      ? "primary.light"
                      : "rgba(0,0,0,0.2)",
                  color: item.item_id === value ? "white" : undefined,
                },
                p: 1, // Adicionando padding para melhor visual
              }}
            >
              <ItemSlot
                item={{ type: item.item_id }}
                showInf
                showInfData={{ id: true, gold: true, weight: true }}
                selected={item.item_id === value}
              />
            </ListItem>
          </Grid>
        ))}
      </Grid>
      {filteredItems.length === 0 && (
        <Typography color="textSecondary" align="center" sx={{ p: 4 }}>
          {language.get("filter_result_empty")}
        </Typography>
      )}
    </StyledDialog>
  );
};
