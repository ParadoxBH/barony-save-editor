import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
  Stack,
  Box,
  Divider,
  Slide,
  Slider,
} from "@mui/material";
import type { Item } from "../components/SaveDefinition";
import { ItemSlot } from "../components/ItemSlot";
import { ItemSelectionDialog } from "../components/ItemSelectionDialog";
import { useAppSelector } from "../StoreContext";
import { StyledDialog } from "../components/StyledDialog";
import { InputSlider } from "../components/InputSlider";

// 2. Definição da Interface das Props do Componente
interface InventoryItemEditorProps {
  item?: Item;
  // A função onChange recebe o item atualizado e não retorna nada (void)
  onChange: (updatedItem: Item) => void;
  onClose?: () => void;
  onDelete?: () => void;
}

export function genItemNull() {
  return {
    type: 0,
    status: 1,
    appearance: 0,
    beatitude: 0,
    count: 1,
    identified: true,
    x: -9999,
    y: -9999,
  } as Item;
}

// 3. Componente com Tipagem Explícita (React.FC)
export const ItemEditor: React.FC<InventoryItemEditorProps> = ({
  item,
  onChange,
  onClose,
  onDelete,
}) => {
  // Use o estado local para gerenciar as alterações do formulário
  // O estado é tipado como 'InventoryItem'
  const [editedItem, setEditedItem] = useState<Item | undefined>(item);
  const [showEditItem, setShowEditItem] = useState<boolean>(false);
  const { itens } = useAppSelector((s) => s.common);
  // Se a prop 'item' mudar, atualize o estado local (importante para quando o item de edição muda)
  useEffect(() => {
    setEditedItem(item);
  }, [item]);

  /**
   * Manipula a mudança de valor nos campos de texto (number).
   * Utilizamos ChangeEvent<HTMLInputElement> para tipar o evento.
   */
  const handleTextFieldChange = (event: any) => {
    const { name, value } = event.target;

    // Converte o valor para number (Int) ou mantém o boolean para 'identified'
    let newValue: number | boolean;

    if (name === "identified") {
      newValue = event.target.checked;
    } else {
      // Usamos parseInt para números inteiros (como nos seus dados)
      newValue = parseInt(value, 10);
      // Fallback: se for NaN após o parse, pode-se querer 0 ou o valor anterior.
      if (isNaN(newValue)) return;
    }

    //@ts-ignore
    setEditedItem((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  /**
   * Manipula a mudança no checkbox de identificação.
   */
  const handleCheckboxChange = (event: any) => {
    //@ts-ignore
    setEditedItem((prev) => ({
      ...prev,
      identified: event.target.checked,
    }));
  };

  /**
   * Lida com a submissão do formulário. FormEvent<HTMLFormElement> tipa o evento.
   */
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Chama a função onChange com o item editado
    if (editedItem) onChange(editedItem);
  };

  const currentItemData = editedItem ? itens[editedItem.type] : undefined;

  return (
    <StyledDialog
      onClose={onClose}
      open={!!item}
      title={"Editando Item"}
      actions={
        <>
          {onDelete && (
            <Button
              type="submit"
              variant="contained"
              color="error"
              onClick={onDelete}
            >
              Deletar
            </Button>
          )}
          {onClose && (
            <Button
              type="submit"
              variant="contained"
              color="inherit"
              onClick={onClose}
            >
              Cancelar
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={editedItem ? () => onChange(editedItem) : undefined}
            disabled={!editedItem}
          >
            Confirmar
          </Button>
        </>
      }
    >
      <Box width={450}>
        <form onSubmit={handleSubmit}>
          {editedItem && (
            <Stack spacing={2}>
              {currentItemData && (
                <Stack direction={"row"} alignItems={"center"} spacing={2}>
                  <Button
                    color="inherit"
                    onClick={() => setShowEditItem(true)}
                    variant="outlined"
                    fullWidth
                  >
                    <Stack flex={1} alignItems={"start"}>
                      <Typography variant="subtitle2" color="rgba(0,0,0,0.5)">
                        Item
                      </Typography>
                      <ItemSlot
                        item={editedItem || null}
                        showInf
                        onClick={() => setShowEditItem(true)}
                      />
                    </Stack>
                  </Button>
                  <ItemSelectionDialog
                    open={showEditItem}
                    onClose={() => setShowEditItem(false)}
                    onSelectItem={(item) => {
                      setShowEditItem(false);
                      handleTextFieldChange({
                        target: { name: "type", value: item },
                      });
                    }}
                    value={editedItem.type}
                  />
                </Stack>
              )}

              <InputSlider
                label="Durabilidade"
                name={"status"}
                min={0}
                max={4}
                value={editedItem.status}
                onChange={handleTextFieldChange}
                labelValue={(value: number) => {
                  if (value === 0) return "Quebrado";
                  if (value === 1) return "Decrépito";
                  if (value === 2) return "Desgastado";
                  if (value === 3) return "Funcional";
                  if (value === 4) return "Excelente";
                  return value;
                }}
              />

              {/* Campo 'appearance' */}
              <TextField
                fullWidth
                label="Aparência"
                name="appearance"
                type="number"
                value={editedItem.appearance.toString()}
                onChange={handleTextFieldChange}
                margin="normal"
                size="small"
              />

              {/* Campo 'count' */}
              <TextField
                fullWidth
                label="Quantidade"
                name="count"
                type="number"
                value={editedItem.count.toString()}
                onChange={handleTextFieldChange}
                margin="normal"
                size="small"
                inputProps={{ min: 1 }}
              />

              {/* Campo 'beatitude' */}
              <TextField
                fullWidth
                label={editedItem.beatitude < 0 ? "Amaldiçoado" : "Sagrado"}
                name="beatitude"
                type="number"
                value={editedItem.beatitude.toString()}
                onChange={handleTextFieldChange}
                margin="normal"
                size="small"
              />

              {/* Checkbox 'identified' */}
              <FormControlLabel
                control={
                  <Checkbox
                    name="identified"
                    checked={editedItem.identified}
                    onChange={handleCheckboxChange}
                    color="primary"
                  />
                }
                label="Identificado?"
              />
            </Stack>
          )}
        </form>
      </Box>
    </StyledDialog>
  );
};
