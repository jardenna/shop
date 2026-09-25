import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type ToastTypes = 'success' | 'info' | 'warning' | 'error';

export interface Toastprops {
  message: string;
  count?: number;
  id?: string;
  type?: ToastTypes;
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
      console.log(action.payload);

      state.toastList.unshift({
        ...action.payload,
        id: nanoid(),
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
