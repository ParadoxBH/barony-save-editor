import { Card, Stack, TextField, Typography } from "@mui/material";

interface InputStatusProps {
  label: string;
  value?: number;
  name?: string;
  onChange?: (event: {
    target: {
      name: string;
      value: number;
    };
  }) => void;
}

export function InputStatus({ label, value, name, onChange }: InputStatusProps) {
  return (
    <Card elevation={1}>
      <Stack m={1} alignItems={"center"}>
        <Typography fontWeight={"bold"}>
          {label.substring(0, 3).toUpperCase()}
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          name={name}
          type="number"
          value={value || 0}
          disabled={value === undefined}
          onChange={onChange}
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
