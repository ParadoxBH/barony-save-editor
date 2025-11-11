import { useState } from "react";
import { setLanguage, useAppDispatch, useAppSelector } from "../StoreContext";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

export interface LangData {
  [key: string]: string;
}

export type LangOptions = "en" | "pt-br";

export async function loadLangFile(fileName: LangOptions): Promise<LangData> {
  const langData: LangData = {};
  const files = ["ui"];

  for (const file of files) {
    const response = await fetch(`./language/${fileName}/${file}.lang`);
    const text = await response.text();

    const lines = text.split("\n");

    lines.forEach((line) => {
      // Remove comentários do final da linha
      const commentIndex = line.indexOf("#");
      const cleanLine =
        commentIndex >= 0 ? line.substring(0, commentIndex) : line;

      const trimmed = cleanLine.trim();

      // Ignora linhas vazias
      if (!trimmed) return;

      const colonIndex = trimmed.indexOf(":");
      if (colonIndex > 0) {
        const key = trimmed.substring(0, colonIndex).trim();
        const value = trimmed.substring(colonIndex + 1).trim();
        langData[key] = value;
      }
    });
  }

  return langData;
}

export function useLanguage() {
  const { language, language_selected } = useAppSelector((S) => S.common);
  const dispatch = useAppDispatch();

  function get(field: string) {
    if (field in language) return language[field];
    return field;
  }

  async function init() {
    await load(language_selected);
  }

  async function load(language_selected: LangOptions) {
    const language = await loadLangFile(language_selected);
    dispatch(setLanguage({ language, selected: language_selected }));
  }

  return { get, init, load };
}

export function LanguageSelector() {
  const language = useLanguage();
  const { language_selected } = useAppSelector(s => s.common);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLanguageSelect = (lang: LangOptions) => {
    language.load(lang);
    handleClose();
  };

  const languages = [
    { code: "pt-br", name: "Português", flag: "🇧🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ];

  return (
    <>
      <Button variant="outlined" color="inherit" onClick={handleOpen} size="small" sx={{borderRadius: 1}}>
        <Typography fontSize={18} sx={{color: "white"}}>
          {languages.find(l => l.code === language_selected)?.flag || "🌐"}
        </Typography>
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: "center" }}>
          <Typography fontSize={48}>🌐</Typography>
          <Typography variant="h6">
            {language.get("select_language_title")}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ py: 2 }}>
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={lang.code === language_selected ? "contained" : "outlined"}
                size="large"
                onClick={() => handleLanguageSelect(lang.code as LangOptions)}
                sx={{
                  justifyContent: "flex-start",
                  px: 3,
                  py: 1.5,
                  textTransform: "none",
                }}
              >
                <Typography fontSize={24} sx={{ mr: 2 }}>
                  {lang.flag}
                </Typography>
                <Typography variant="body1">{lang.name}</Typography>
              </Button>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
