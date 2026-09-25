import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type ToastTypes = 'success' | 'info' | 'warning' | 'error';

interface Toastprops {
  id: string;
  message: string;
  type: ToastTypes;
  count?: number;
}

export interface ToastState {
  toastList: Toastprops[];
}

const initialState: ToastState = {
  toastList: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toastprops>) => {
      state.toastList.unshift({
        ...action.payload,
      });
    },
    dismissToast: (state, action: PayloadAction<string>) => {
      state.toastList.filter((toast) => toast.id !== action.payload);
    },
    clearToasts: (state) => {
      state.toastList = [];
    },
  },
});

export const selectToastList = (state: RootState) => state.toast.toastList;

export const { addToast, dismissToast, clearToasts } = toastSlice.actions;

export default toastSlice.reducer;
