import { Card, Stack, TextField, Typography } from "@mui/material";
import { InputNumber } from "./InputNumber";

interface InputStatusProps {
  label: string;
  value?: number;
  name: string;
  onChange?: (event: {
    target: {
      name: string;
      value: number;
    };
  }) => void;
}

export function InputStatus({ label, value, name, onChange }: InputStatusProps) {

  function handleOnChange(e: any)
  {
    if(onChange)
      onChange({target: {name: e.target.name, value: parseInt(e.target.value.toString())}});
  }
  return (
    <Card elevation={1}>
      <Stack m={1} alignItems={"center"}>
        <Typography fontWeight={"bold"}>
          {label.substring(0, 3).toUpperCase()}
        </Typography>
        <InputNumber
          name={name}
          value={value}
          disabled={value === undefined}
          onChange={handleOnChange}
          sx={{
            width: "50px",
            "& .MuiInputBase-root": {
              minHeight: 0,
              height: "auto",
            },
            "& .MuiInputBase-input": {
              padding: "4px 8px", // Ajuste conforme necessário
              minHeight: 0,
            },
          }}
        />
      </Stack>
    </Card>
  );
}
