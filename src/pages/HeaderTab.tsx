import { Icon } from "../components/Icon";
import { useLanguage } from "../components/language";
import { Tab as MuiTab, Stack, Tooltip, Typography } from "@mui/material";

interface TabProps {
  id: string;
  icon?: string;
  value: number;
  disabled?: boolean;
}
export function Tab({ id, value, icon, disabled, ...props }: TabProps) {
  const language = useLanguage();
  const label = language.get(`tab_${id}`);
  return (
    <MuiTab
      disabled={disabled}
      sx={{ minWidth: 60, p: 1, m: 0 }}
      label={
        <Tooltip title={label} placement="top" disableInteractive>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Icon name={icon || `tabs/${id}`} size={32} sx={disabled ? {filter: "grayscale(100%)", opacity: 0.5} : undefined}/>
            <Typography fontWeight={"bold"}>{label}</Typography>
          </Stack>
        </Tooltip>
      }
      value={value}
      {...props}
    />
  );
}
