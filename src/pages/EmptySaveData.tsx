import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { Icon } from "../components/Icon";
import { useLanguage } from "../components/language";

export function EmptySaveData() {
  const language = useLanguage();
  return (
    <Stack flex={1} height={"100%"} justifyContent={"center"}>
      <Card sx={{ maxWidth: 500, mx: "auto" }}>
        <CardContent>
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography fontSize={64}>
                📥
            </Typography>
            <Typography variant="h6" gutterBottom>
              {language.get("empty_load_file_title")}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {language.get("empty_load_file_label")}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}
