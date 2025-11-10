import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import type { Item, EditorData } from "./utils/EditorDefinition";
import type { ReactNode } from "react";
import { items } from "../public/items.json";
export type ItemDataMap = { [key: string]: ItemData };

export const TAB_INVENTORY = 0;
export const TAB_EQUIPAMENT = 1;

export interface ItemData {
  name?: string;
  item_id: number; //key
  third_person_model_index: number; //3D Model
  first_person_model_index: number; //3D Model
  gold_value: number; //Valor
  weight_value: number; //Peso
  item_level: number; //Andar minimo para se encontrar
  item_category: string; //Grupo do item
  equip_slot: string; //Slot de Equipamento
  item_images: string[]; //Path imagens
  stats: { [key: string]: number }; //Modificadores
  tooltip: { [key: string]: string };
}

function getItemsMapped(items: ItemDataMap) {
  return Object.keys(items).reduce((result, i) => {
    result[items[i].item_id] = { ...items[i], name: i };
    return result;
  }, {} as ItemDataMap);
}

type ApplicationState = {
  tab: number;
  saveData?: EditorData;
  saveName?: string;

  language?: string;
  playerSelected?: number;
  itens: ItemDataMap;
};

const initialApplicationState: ApplicationState = {
  tab: TAB_INVENTORY,
  itens: getItemsMapped(items as ItemDataMap),
};

const applicationSlice = createSlice({
  name: "application",
  initialState: initialApplicationState,
  reducers: {
    setLanguage(state: ApplicationState, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setSaveData(
      state: ApplicationState,
      action: PayloadAction<{ saveData: EditorData; saveName: string }>
    ) {
      const { saveData, saveName } = action.payload;
      console.log("Load", saveData);
      state.saveData = saveData;
      state.saveName = saveName;
      state.playerSelected = saveData.players.findIndex(p => p.name === saveData.save.game_name);
    },
    setPlayerSelected(state: ApplicationState, action: PayloadAction<number>) {
      state.playerSelected = action.payload;
    },
    setPlayerInventory(
      state: ApplicationState,
      action: PayloadAction<{[key: string]: Item}>
    ) {
      if (!state.saveData || state.playerSelected === undefined) return;
      state.saveData.players[state.playerSelected].inventory =
        action.payload;
    },
    setTab(state: ApplicationState, action: PayloadAction<number>) {
      state.tab = action.payload;
    },
  },
});

export const {
  setLanguage,
  setSaveData,
  setPlayerSelected,
  setPlayerInventory,
  setTab,
} = applicationSlice.actions;

// Configuração da store
export const store = configureStore({
  reducer: {
    common: applicationSlice.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

// Tipos inferidos da store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks tipados
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export function getCharacter() {
  const { saveData, playerSelected } = useAppSelector((s) => s.common);
  if (!saveData || playerSelected === undefined) return undefined;
  return saveData.players[playerSelected];
}

// Provider Component
interface StoreContextProps {
  children: ReactNode;
}

export function StoreContext({ children }: StoreContextProps) {
  return <Provider store={store}>{children}</Provider>;
}
