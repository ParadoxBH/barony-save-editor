import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  type SxProps,
} from "@mui/material";
import { Icon } from "./Icon";

interface InputSelectionProps {
  name: string;
  label?: string;
  value: any;
  onChange: (value: any) => void;
  options: InputSelectionOptions;
  fullWidth?: boolean;
  sx?: {
    root?: SxProps;
    header?: SxProps;
    label?: SxProps;
    icon?: SxProps;
    select?: SxProps;
    item?: SxProps;
  };
  error?: boolean;
}

export type InputSelectionOptions = InputSelectionOption[];
export type InputSelectionOption = { value: any; label: string; icon?: string };

export function InputSelection({
  name,
  value,
  onChange,
  label,
  options,
  fullWidth,
  sx,
  error,
}: InputSelectionProps) {
  return (
    <FormControl
      variant="outlined"
      size="small"
      sx={sx?.root}
      fullWidth={fullWidth} 
      error={error}
    >
      <InputLabel id={`label_${name}`} sx={sx?.header} error={error}>
        {label}
      </InputLabel>
      <Select 
        error={error}
        labelId={`label_${name}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
          },
          "& .MuiSelect-select": {
            paddingTop: (theme) => theme.spacing(1),
            paddingBottom: (theme) => theme.spacing(1),
            paddingLeft: (theme) => theme.spacing(2),
            paddingRight: (theme) => theme.spacing(2),
            textAlign: "left",
          },
          ...(sx?.select || {}),
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} sx={sx?.item}>
            <Stack spacing={1} direction={"row"} alignItems={"center"}>
              {option.icon && <Icon name={option.icon} sx={sx?.icon} />}
              {option.label && (
                <Typography sx={sx?.label}>{option.label}</Typography>
              )}
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
