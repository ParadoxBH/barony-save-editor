import { Box, Paper, Stack, Typography } from "@mui/material";
import { type ReactNode } from "react";

interface TabWindowProps {
  label: string;
  children?: ReactNode;
  width?: number;
  actions?: ReactNode;
  prefix?: ReactNode;
  postfix?: ReactNode;
  startIcon?: ReactNode;
}

export function TabWindow({
  label,
  children,
  width,
  actions,
  prefix,
  postfix,
  startIcon,
}: TabWindowProps) {
  return (
    <Box maxHeight={"100%"} display={"flex"}>
      <Paper elevation={3} sx={{ display: "flex" }}>
        <Stack alignItems={"center"} spacing={2} p={2}>
          <Stack
            direction={"row"}
            spacing={4}
            alignItems={"center"}
            justifyContent={actions ? "space-between" : "center"}
            width={"100%"}
          >
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              {startIcon}
              <Typography variant="h6" gutterBottom>
                {label}
              </Typography>
            </Stack>
            {actions && (
              <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
                {actions}
              </Stack>
            )}
          </Stack>
          {prefix}
          <Box
            flex={1}
            width={width}
            sx={{ overflowX: "hidden", overflowY: "auto" }}
          >
            {children}
          </Box>
          {postfix}
        </Stack>
      </Paper>
    </Box>
  );
}
