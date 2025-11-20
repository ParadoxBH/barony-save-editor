import { Box, Paper, Stack, Typography } from "@mui/material";
import { type ReactNode } from "react";

interface TabWindowProps {
  label: string;
  children: ReactNode;
  width?: number;
}

export function TabWindow({ label, children, width }: TabWindowProps) {
  return (
    <Box maxHeight={"100%"} display={"flex"}>
      <Paper elevation={3} sx={{ display: "flex"}}>
        <Stack alignItems={"center"} spacing={2} p={2}>
          <Typography variant="h6" gutterBottom>
            {label}
          </Typography>
          <Box
            flex={1}
            width={width}
            sx={{ overflowX: "hidden", overflowY: "auto" }}
          >
            {children}
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
