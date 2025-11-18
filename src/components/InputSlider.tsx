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

  function handleOnChange(
    e: { target: { name: string; value: string } },
    value: number,
    activeThumb: number,
  ) {
    let numberValue: number = parseInt(e.target.value.toString());
    if(min != undefined)
      numberValue = Math.max(numberValue, min);
    if(max != undefined)
      numberValue = Math.min(numberValue, max);
    if (onChange)
      onChange({ target: { name: e.target.name, value: numberValue } }, numberValue, activeThumb);
    setTempValue(numberValue);
  }

  return (
    <Stack flex={1}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="subtitle2" color={"rgba(0,0,0,0.5)"}>
          {label}
        </Typography>
        <Chip label={!!labelValue ? labelValue(tempValue) : tempValue || "0"} />
      </Stack>
      <Slider
        aria-label="Durabilidade"
        value={tempValue}
        name={name}
        step={1}
        marks={(max || 0) - (min || 0) < 10}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        //@ts-ignore
        onChange={handleOnChange}
        //@ts-ignore
        onChangeCommitted={handleOnChange}
      />
    </Stack>
  );
}
