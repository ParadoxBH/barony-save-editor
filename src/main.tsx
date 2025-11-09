import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "./index.css";
import { StoreContext } from "./StoreContext.tsx";
import { Home } from "./pages/Home.tsx";
import { theme } from "./theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreContext>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home/>
      </ThemeProvider>
    </StoreContext>
  </React.StrictMode>
);