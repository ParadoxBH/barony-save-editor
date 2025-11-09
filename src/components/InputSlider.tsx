import { Slider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Chip } from "./Chip";

interface InputSliderProps {
  value: number;
  name: string;
  label: string;
  onChange: (
    event: { target: { name: string; value: number } },
    value: number,
    activeThumb: number
  ) => void;
  min?: number;
  max?: number;
  labelValue?: (value: number) => string | number;
}

export function InputSlider({
  value,
  label,
  name,
  onChange,
  min,
  max,
  labelValue,
}: InputSliderProps) {
  const [tempValue, setTempValue] = useState<number>(value);
  useEffect(() => {
    setTempValue(value);
  }, [value]);

  return (
    <Stack>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="subtitle2" color={"rgba(0,0,0,0.5)"}>{label}</Typography>
            <Chip label={!!labelValue ? labelValue(tempValue) : tempValue}/>
        </Stack>
      <Slider
        aria-label="Durabilidade"
        value={tempValue}
        name={name}
        step={1}
        marks
        min={min}
        max={max}
        valueLabelDisplay="auto"
        //@ts-ignore
        onChange={onChange}
        //@ts-ignore
        onChangeCommitted={onChange}
      />
    </Stack>
  );
}
