import {
  Box,
  Divider,
  Paper,
  Stack,
  Tooltip,
  Typography,
  type SxProps,
} from "@mui/material";
import type { Item } from "../utils/EditorDefinition";
import { useEffect, useState } from "react";
import { Chip } from "./Chip";
import { useAppSelector } from "../StoreContext";
import { theme } from "../theme";
import { useLanguage } from "./language";

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
  const language = useLanguage();

  // Troca automática a cada 3 segundos
  useEffect(() => {
    setIndex(item?.appearance || 0);
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
    <Stack direction={"row"} spacing={1}>
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
          <Tooltip
            placement="right"
            disableInteractive
            title={
              currentItem ? (
                <Stack minWidth={150}>
                  <TooltipInfo
                    label={language.getItem(currentItem?.name, item?.identified)}
                    sx={{
                      label: {
                        color: theme.palette.primary.light,
                        fontWeight: "bold",
                      },
                    }}
                  />
                  <TooltipInfo label={"ID"} value={currentItem.item_id} />
                  {!!currentItem.item_category && (
                    <TooltipInfo
                      label={language.get("item_type_label")}
                      value={language.get(
                        `item_type_${currentItem.item_category}`
                      )}
                    />
                  )}
                  {!!currentItem.equip_slot && (
                    <TooltipInfo
                      label={language.get("item_equip_slot")}
                      value={language.get(
                        `item_equip_slot_${currentItem.equip_slot}`
                      )}
                    />
                  )}
                  {!!currentItem.item_level && currentItem.item_level > 0 && (
                    <TooltipInfo
                      label={language.get("item_dungeon_level")}
                      value={currentItem.item_level}
                    />
                  )}
                  {!!currentItem.gold_value && (
                    <TooltipInfo
                      label={language.get("item_price")}
                      value={currentItem.gold_value}
                    />
                  )}
                  <TooltipInfo
                    label={language.get("item_weight")}
                    value={currentItem.weight_value || 0}
                  />
                  <Divider color={"white"} />
                  <TooltipInfo
                    label={language.get("item_status")}
                    sx={{
                      label: {
                        color: theme.palette.primary.light,
                        fontWeight: "bold",
                      },
                    }}
                  />
                  {Object.keys(currentItem.stats).map((s) => (
                    <TooltipInfo
                      key={s}
                      label={s}
                      value={currentItem.stats[s]}
                    />
                  ))}
                </Stack>
              ) : undefined
            }
          >
            <Box>
              <ItemIcon
                image={
                  currentItem && currentItem.item_images
                    ? currentItem.item_images[
                        index % currentItem.item_images.length
                      ]
                    : undefined
                }
              />
            </Box>
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
                tooltip={language.get("item_type_label")}
                icon={"damage"}
                label={language.get(`item_type_${currentItem.item_category}`)}
              />
            )}
            {(!showInfData || showInfData.gold) && (
              <Chip
                tooltip={language.get("item_price")}
                icon={"money"}
                label={currentItem.gold_value}
              />
            )}
            {(!showInfData || showInfData.weight) && (
              <Chip
                tooltip={language.get("item_weight")}
                icon={"weight"}
                label={currentItem.weight_value}
              />
            )}
          </Stack>
          <Typography>
            {language.getItem(currentItem?.name, item?.identified)}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}

interface TooltipInfoProps {
  sx?: { label?: SxProps; value?: SxProps };
  label?: string;
  value?: any;
}

function TooltipInfo({ label, value, sx }: TooltipInfoProps) {
  return (
    <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
      <Typography sx={sx?.label}>{label}</Typography>
      <Typography sx={sx?.value}>{value}</Typography>
    </Stack>
  );
}

export function ItemIcon({ image, sx }: { image?: string, sx?: SxProps }) {
  return (
    <Box
      sx={{
        backgroundImage: `url(${image || "./items/images/null.png"})`,
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
        ...sx
      }}
    />
  );
}
