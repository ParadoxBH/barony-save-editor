import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import "./index.css";
import { StoreContext } from "./StoreContext.tsx";

const theme = createTheme({
  palette: {
    mode: "light", // ou "dark"
    primary: { main: "#1976d2" },
    background: { default: "#fafafa" },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreContext>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StoreContext>
  </React.StrictMode>
);