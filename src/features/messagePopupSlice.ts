import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

export type MessagePopupTypes = 'success' | 'info' | 'warning' | 'error';
export type ComponentType = 'notification' | 'toast';

export type MessagePopupPosition =
  | 'top-center'
  | 'top-right'
  | 'top-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'bottom-left';

export type MessagePopup = {
  id: string;
  message: string;
  messagePopupType: MessagePopupTypes;
  componentType?: ComponentType;
  count?: number;
  onClose?: () => void;
};

export type MessagePopupWithoutId = Omit<MessagePopup, 'id'>;

type MessagePopupState = {
  messagePopups: MessagePopup[];
  autoHideDuration?: number;
};

const initialState: Readonly<MessagePopupState> = {
  messagePopups: [],
  autoHideDuration: 5000,
};

const messagePopupSlice = createSlice({
  name: 'messagePopup',
  initialState,
  reducers: {
    addMessagePopup: (state, action: PayloadAction<MessagePopupWithoutId>) => {
      const { message, messagePopupType } = action.payload;

      if (messagePopupType === 'error') {
        const existing = state.messagePopups.find(
          (popup) =>
            popup.message === message && popup.messagePopupType === 'error',
        );

        if (existing) {
          existing.count = (existing.count || 1) + 1;
          return;
        }
      }

      state.messagePopups.unshift({
        id: nanoid(),
        count: messagePopupType === 'error' ? 1 : undefined,
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
