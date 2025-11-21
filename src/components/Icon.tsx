import React from "react";
import { Box, type SxProps } from "@mui/material";

interface IconProps {
  name: string;
  size?: number;
  sx?: SxProps;
  format?: string;
}
export function Icon({ name, size, sx, format }: IconProps) {
  return (
    <Box
      sx={{
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${name}.${format || "png"})`,
        width: size || 18,
        height: size || 18,
        ...sx
      }}
    />
  );
}
