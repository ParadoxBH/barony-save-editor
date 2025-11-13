import { TextField, type SxProps } from "@mui/material";

interface InputNumberProps {
  label?: string;
  name: string;
  value?: number;
  onChange: (e: { target: { name: string; value: number } }) => void;
  sx?: SxProps;
  fullWidth?: boolean;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function InputNumber({
  name,
  label,
  value,
  onChange,
  sx,
  fullWidth,
  min,
  max,
  disabled,
}: InputNumberProps) {
  function handleOnUpdate(e: any) {
    const numberValue: number = parseInt(e.target.value.toString());
    if (onChange)
      onChange({ target: { name: e.target.name, value: numberValue } });
  }

  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      name={name}
      type={"number"}
      value={value || 0}
      inputProps={{ min, max }}
      margin="normal"
      size="small"
      sx={sx}
      //@ts-ignore
      onChange={handleOnUpdate}
      disabled={disabled}
    />
  );
}
