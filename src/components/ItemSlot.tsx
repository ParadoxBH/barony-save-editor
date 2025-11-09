import { Box, Paper, Stack, Tooltip, Typography } from "@mui/material";
import type { Item } from "./SaveDefinition";
import { useEffect, useState } from "react";
import { Chip } from "./Chip";
import { useAppSelector } from "../StoreContext";

interface ItemSlotProps {
  item: Item | null;
  onClick?: () => void;
  size?: number;
  showInf?: boolean;
  showInfData?: {
    id?: boolean;
    category?: boolean;
    gold?: boolean;
    weight?: boolean;
  };
  selected?: boolean;
}
export function getSlotColor(item: Item | null) {
  if (item === null) return "#111111ff";
  const { beatitude, identified } = item;
  if (!identified) return "#FFC90E";
  if (beatitude < 0) return "#ED1C24";
  if (beatitude > 0) return "#00A2E8";
  return "#414141ff";
}

export function ItemSlot({
  item,
  onClick,
  size,
  showInf,
  showInfData,
  selected,
}: ItemSlotProps) {
  const [index, setIndex] = useState(item?.appearance || 0);
  const { itens } = useAppSelector((s) => s.common);
  const currentItem = item && item.type in itens ? itens[item.type] : undefined;

  // Troca automática a cada 3 segundos
  useEffect(() => {
    if (
      !(
        currentItem &&
        currentItem?.item_images.length > 0 &&
        item?.appearance === undefined
      )
    )
      return () => null;
    const intervalo = setInterval(() => {
      setIndex(
        (prev) =>
          (prev + 1) % (currentItem ? currentItem.item_images.length : 0)
      );
    }, 1000);
    return () => clearInterval(intervalo);
  }, [item, currentItem]);

  return (
    <Stack
      direction={"row"}
      spacing={1}
    >
      <Paper
        onClick={onClick}
        sx={{
          height: size || 40,
          width: size || 40,
          minHeight: size || 40,
          minWidth: size || 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: onClick ? "pointer" : "default",
          position: "relative",
          backgroundColor: getSlotColor(item),
          "&:hover": onClick
            ? {
                opacity: 0.8,
              }
            : undefined,
          borderRadius: 1,
        }}
      >
        {item && (
          <Tooltip placement="right" disableInteractive title={
            currentItem ? <Stack minWidth={150}>
              {Object.keys(currentItem.stats).map(s => 
                <Stack key={s} direction={"row"} justifyContent={"space-between"} spacing={2}>
                  <Typography>{s}</Typography>
                  <Typography>{currentItem.stats[s]}</Typography>
                </Stack>
              )}
            </Stack> : undefined
          }>
          <Box
            sx={{
              backgroundImage:
                currentItem && currentItem.item_images
                  ? `url(${
                      currentItem.item_images[
                        index % currentItem.item_images.length
                      ] || ""
                    })`
                  : undefined,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              borderRadius: 1,
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              display: "flex",
              alignItems: "end",
              justifyContent: "center",
              m: 0.5,
              transition: "background-image 0.2s ease-in-out",
            }}
          />
          </Tooltip>
        )}
        {item && item.count > 1 && (
          <Typography
            variant="subtitle2"
            fontSize={10}
            sx={{
              background: "rgba(0,0,0,0.5)",
              pl: 0.5,
              pr: 0.5,
              position: "absolute",
              right: 0,
              bottom: 0,
              borderRadius: 1,
            }}
            color="white"
            fontWeight="bold"
          >
            {item.count}
          </Typography>
        )}
      </Paper>
      {showInf && currentItem && (
        <Stack alignItems={"start"}>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            {(!showInfData || showInfData.id) && (
              <Chip tooltip={"ID"} icon={"info"} label={currentItem.item_id} />
            )}
            {(!showInfData || showInfData.category) && (
              <Chip
                tooltip={"Categoria"}
                icon={"damage"}
                label={currentItem.item_category}
              />
            )}
            {(!showInfData || showInfData.gold) && (
              <Chip
                tooltip={"Preço"}
                icon={"money"}
                label={currentItem.gold_value}
              />
            )}
            {(!showInfData || showInfData.weight) && (
              <Chip
                tooltip={"Peso"}
                icon={"weight"}
                label={currentItem.weight_value}
              />
            )}
            {(currentItem && false) && (
              <Chip
                tooltip={"Andar Minimo"}
                icon={"Inventory_Drop"}
                label={currentItem?.item_level}
              />
            )}
          </Stack>
          <Typography>{currentItem?.name || "Missingno"}</Typography>
        </Stack>
      )}
    </Stack>
  );
}
