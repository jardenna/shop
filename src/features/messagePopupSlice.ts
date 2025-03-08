import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type MessagePopupTypes = 'success' | 'info' | 'warning' | 'error';
export type ComponentType = 'notification' | 'toast';

export type MessagePopupPosition =
  | 'top-center'
  | 'top-right'
  | 'top-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'bottom-left';

export interface MessagePopup {
  id: string;
  message: string;
  messagePopupType: MessagePopupTypes;
  componentType?: ComponentType;
  onClose?: () => void;
}

export type MessagePopupWithoutId = Omit<MessagePopup, 'id'>;

interface MessagePopupState {
  messagePopups: MessagePopup[];
  autoHideDuration?: number;
}

const initialState: Readonly<MessagePopupState> = {
  messagePopups: [],
  autoHideDuration: 5000,
};

const messagePopupSlice = createSlice({
  name: 'messagePopup',
  initialState,
  reducers: {
    addMessagePopup: (state, action: PayloadAction<MessagePopupWithoutId>) => {
      state.messagePopups.unshift({
        id: nanoid(),
        ...action.payload,
      });
    },
    dismissMessagePopup: (state, action: PayloadAction<string>) => {
      state.messagePopups = state.messagePopups.filter(
        (messagePopup) => messagePopup.id !== action.payload,
      );
    },
    setMessagePopupDuration: (
      state,
      action: PayloadAction<MessagePopupState['autoHideDuration']>,
    ) => {
      state.autoHideDuration = action.payload;
    },
  },
});

export const { addMessagePopup, dismissMessagePopup, setMessagePopupDuration } =
  messagePopupSlice.actions;

export const selectMessagePopups = (state: RootState) =>
  state.messagePopup.messagePopups;

export const selectDuration = (state: RootState) =>
  state.messagePopup.autoHideDuration;

export default messagePopupSlice.reducer;
