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
import { Icon } from "./Icon";

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
    field = field.toLowerCase();
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
  const { language_selected } = useAppSelector((s) => s.common);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLanguageSelect = (lang: LangOptions) => {
    language.load(lang);
    handleClose();
  };

  const languages = [
    { code: "pt-br", name: "Português" },
    { code: "en", name: "English" },
  ];

  return (
    <>
      <Stack justifyContent={"center"}>
        <IconButton onClick={handleOpen} size="small">
          <Icon name={`language/${language_selected}`} size={32} />
        </IconButton>
      </Stack>

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
                variant={
                  lang.code === language_selected ? "contained" : "outlined"
                }
                size="large"
                onClick={() => handleLanguageSelect(lang.code as LangOptions)}
                sx={{
                  justifyContent: "flex-start",
                  px: 3,
                  py: 1.5,
                  textTransform: "none",
                }}
              >
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Icon name={`language/${lang.code}`} size={32} />
                  <Typography variant="body1">{lang.name}</Typography>
                </Stack>
              </Button>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
