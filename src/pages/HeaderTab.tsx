import { Icon } from "../components/Icon";
import { useLanguage } from "../components/language";
import { Tab as MuiTab, Stack, Tooltip, Typography } from "@mui/material";

interface TabProps {
  id: string;
  value: number;
}
export function Tab({ id, value, ...props }: TabProps) {
  const language = useLanguage();
  const label = language.get(`tab_${id}`);
  return (
    <MuiTab
      sx={{ minWidth: 60, p: 1, m: 0 }}
      label={
        <Tooltip title={label} placement="top" disableInteractive>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Icon name={`tabs/${id}`} size={32} />
            <Typography fontWeight={"bold"}>{label}</Typography>
          </Stack>
        </Tooltip>
      }
      value={value}
      {...props}
    />
  );
}
