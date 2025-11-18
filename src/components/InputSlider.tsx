import { Slider, Stack, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
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
  debounceMs?: number; // Tempo de debounce em ms (padrão: 300)
}

export function InputSlider({
  value,
  label,
  name,
  onChange,
  min,
  max,
  labelValue,
  debounceMs = 250,
}: InputSliderProps) {
  const [tempValue, setTempValue] = useState<number>(value);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  // Limpa o timer ao desmontar
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  function handleSliderChange(
    _event: Event,
    value: number | number[],
    activeThumb: number
  ) {
    let numberValue = Array.isArray(value) ? value[0] : value;
    if(min != undefined)
      numberValue = Math.max(numberValue, min);
    if(max != undefined)
      numberValue = Math.min(numberValue, max);
    setTempValue(numberValue);
  }

  function handleSliderChangeCommitted(
    _event: Event | React.SyntheticEvent,
    value: number | number[]
  ) {
    let numberValue = Array.isArray(value) ? value[0] : value;
    if(min != undefined)
      numberValue = Math.max(numberValue, min);
    if(max != undefined)
      numberValue = Math.min(numberValue, max);

    // Limpa timer anterior se existir
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Cria novo timer de debounce
    debounceTimerRef.current = setTimeout(() => {
      if (onChange) {
        onChange(
          { target: { name, value: numberValue } },
          numberValue,
          0
        );
      }
    }, debounceMs);
  }

  return (
    <Stack flex={1}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle2" color="rgba(0,0,0,0.5)">
          {label}
        </Typography>
        <Chip label={labelValue ? labelValue(tempValue) : tempValue || "0"} />
      </Stack>
      <Slider
        aria-label={label}
        value={tempValue}
        name={name}
        step={1}
        marks={(max || 0) - (min || 0) < 10}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderChangeCommitted}
      />
    </Stack>
  );
}