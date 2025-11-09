import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Stack,
  Typography,
  type Breakpoint,
} from "@mui/material";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

interface StyledDialogProps {
  title: string;
  open?: boolean;
  onClose?: () => void;
  preContainer?: ReactNode;
  postContainer?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: false | Breakpoint | undefined;
  fullWidth?: boolean;
}

export function StyledDialog({
  title,
  open,
  onClose,
  children,
  preContainer,
  postContainer,
  actions,
  maxWidth,
  fullWidth,
}: StyledDialogProps) {
  return (
    <Dialog
      onClose={onClose}
      open={open || false}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <Box p={3} pt={1} pb={1}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" gutterBottom>
            {title || "Novo Dialog"}
          </Typography>
          {onClose && <IconButton size={"small"} onClick={onClose}>
            <Icon name="close" size={24}/>
          </IconButton>}
        </Stack>
      </Box>
      <Divider />
      {preContainer}
      <Box p={3} overflow={"auto"} flex={1}>
        {children}
      </Box>
      {postContainer}
      {!!actions && (
        <>
          <Divider />
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"end"}
            p={1}
            spacing={1}
          >
            {actions}
          </Stack>
        </>
      )}
    </Dialog>
  );
}
