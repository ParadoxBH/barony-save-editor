import React from "react";
import { Box, type SxProps } from "@mui/material";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  sx?: SxProps;
}
export function Icon({ name, size, className, sx }: IconProps) {
  return (
    <Box
      sx={{
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(./${name}.png)`,
        width: size || 18,
        height: size || 18,
      }}
    />
  );
}
