import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { Icon } from "../components/Icon";

export function EmptySaveData() {
  return (
    <Stack flex={1} height={"100%"} justifyContent={"center"}>
      <Card sx={{ maxWidth: 500, mx: "auto" }}>
        <CardContent>
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography fontSize={64}>
                📥
            </Typography>
            <Typography variant="h6" gutterBottom>
              Save não carregado
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Pressione no botão "Carregar Save" presente no canto superior direito para continuar.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}
