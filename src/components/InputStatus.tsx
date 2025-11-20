import { Card, Stack, TextField, Typography } from "@mui/material";
import { InputNumber } from "./InputNumber";
import type { ReactNode } from "react";

interface InputStatusProps {
  label: string;
  value?: number;
  name: string;
  startIcon?: ReactNode;
  fullWidth?: boolean;
  onChange?: (event: {
    target: {
      name: string;
      value: number;
    };
  }) => void;
}

export function InputStatus({
  label,
  value,
  name,
  startIcon,
  onChange,
  fullWidth,
}: InputStatusProps) {
  function handleOnChange(e: any) {
    if (onChange)
      onChange({
        target: {
          name: e.target.name,
          value: parseInt(e.target.value.toString()),
        },
      });
  }
  const spacing = 1;
  return (
    <Card elevation={1} sx={{ flex: fullWidth ? 1 : undefined, background: "rgba(0,0,0,0.1)" }}>
      <Stack m={spacing} spacing={spacing} alignItems={"center"}>
        <Stack direction={"row"} spacing={spacing} alignItems={"center"} justifyContent={"space-between"}>
          {startIcon}
          <Typography fontWeight={"bold"}>
            {label.substring(0, 3).toUpperCase()}
          </Typography>
        </Stack>
        <InputNumber
          name={name}
          value={value}
          disabled={value === undefined}
          onChange={handleOnChange}
          fullWidth
          sx={{
            m:0,
            "& .MuiInputBase-root": {
              minHeight: 0,
              height: "auto",
            },
            "& .MuiInputBase-input": {
              padding: "2px 8px", // Ajuste conforme necessário
              minHeight: 0,
            },
          }}
        />
      </Stack>
    </Card>
  );
}
