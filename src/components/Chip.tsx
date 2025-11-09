import { Chip as ChipUi, Stack, Tooltip, Typography } from "@mui/material";
import { Icon } from "./Icon";

interface ChipProps {
  icon?: string;
  label?: string | number;
  tooltip?: string;
}

export function Chip({ icon, label, tooltip }: ChipProps) {
  return (
    <Tooltip title={tooltip} disableInteractive placement="top">
      <ChipUi
        label={
          <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
            {icon && <Icon name={icon} />}
            <Typography>{label || ""}</Typography>
          </Stack>
        }
        size="small"
      />
    </Tooltip>
  );
}
