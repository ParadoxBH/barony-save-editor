import React from "react";
import { Box, Divider, Stack } from "@mui/material";
import { Editor } from "./Editor";
import { Header } from "./Header";

export function Home() {
  return (
    <Stack
      flex={1}
      sx={{
        backgroundColor: "#f5f5f5",
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Header />
      <Divider />
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          backgroundImage: "url(background.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          p: 2,
        }}
      >
        <Editor />
      </Box>
    </Stack>
  );
}
