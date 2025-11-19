import { Chip as ChipUi, Stack, Tooltip, Typography, type ChipTypeMap, type SxProps } from "@mui/material";
import { Icon } from "./Icon";

interface ChipProps {
  color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  icon?: string;
  label?: string | number;
  tooltip?: string;
  sx?: {root?: SxProps, label?: SxProps, icon?: SxProps};
}

export function Chip({ icon, label, tooltip, sx, color }: ChipProps) {
  return (
    <Tooltip title={tooltip} disableInteractive placement="top">
      <ChipUi
        sx={sx?.root}
        label={
          <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
            {icon && <Icon name={icon} sx={sx?.icon}/>}
            <Typography sx={sx?.label}>{label || ""}</Typography>
          </Stack>
        }
        size="small"
        color={color}
      />
    </Tooltip>
  );
}
