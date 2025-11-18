import { createTheme } from "@mui/material";

// Crie seu tema customizado
export const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Define Roboto como fonte padrão
    fontSize: 12, // Tamanho base da fonte (padrão é 14)
    // Ou customize tamanhos específicos:
    button: {
      fontSize: "0.875rem", // 14px
      textTransform: "none", // Remove o maiúsculo dos botões
    },
    body1: {
      fontSize: "0.875rem",
    },
    h1: {
      fontSize: "2rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Remove maiúsculas dos botões
          minWidth: "auto",
        },
        colorInherit: {
          color: "rgba(0, 0, 0, 0.87)", // Cor do texto para botões inherit
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)", // Efeito hover sutil
          },
        },
        contained: {
          "&:hover": {
            color: "white",
          },
        },
        outlined: {
          "&:hover": {
            color: "white",
          },
        }
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none", // Remove maiúsculas das tabs
          color: "rgba(0, 0, 0, 0.6)", // Cor do texto da tab inativa
          "&:hover": {
            color: "primary.main", // Cor da tab selecionada (usa a cor primária do tema)
            backgroundColor: "rgba(0, 0, 0, 0.04)", // Fundo sutil no hover
          },
          "&.Mui-selected": {
            color: "primary.main", // Cor da tab selecionada (usa a cor primária do tema)
          },
        },
      },
    },
  },
});
