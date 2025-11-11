import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, type ReactNode } from "react";
import { useAppSelector } from "../StoreContext";
import { useLanguage } from "../components/language";

interface LoadingSystemProps {
  children?: ReactNode;
}

export function LoadingSystem({ children }: LoadingSystemProps) {
  const { loading } = useAppSelector((s) => s.common);
  const language = useLanguage();
  const isLoading = Object.keys(loading).filter((l) => !loading[l]);

  useEffect(() => {
    language.init();
  }, []);

  if (isLoading.length === 0) return <>{children}</>;

  const max = Object.values(loading).length;
  const current = isLoading.length - max;

  return (
    <Stack flex={1} height={"100%"} justifyContent={"center"}>
      <Card sx={{ width: 500, mx: "auto" }}>
        <CardContent>
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              flex={1}
              justifyContent={"space-between"}
            >
              <Typography variant="h6" gutterBottom>
                {`Loading`}
              </Typography>
              <Chip label={`${current}/${max}`} size="small" />
            </Stack>
            <LinearProgress
              value={(current / max) * 100}
              variant={current > 0 ? "determinate" : "indeterminate"}
            />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}
