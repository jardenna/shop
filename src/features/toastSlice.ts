import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type ToastTypes = 'success' | 'info' | 'warning' | 'error';

export interface Toastprops {
  message: string;
  count?: number;
  id?: string;
  isExiting?: boolean;
  type?: ToastTypes;
}

export interface ToastTimerProps {
  id: string;
  type: ToastTypes;
}

export interface ToastItemProps extends ToastTimerProps {
  isExiting: boolean;
  message: string;
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
        id: nanoid(),
      });
    },
    startToastExit: (state, action: PayloadAction<string>) => {
      const toastItem = state.toastList.find(
        (toast) => toast.id === action.payload,
      );

      if (toastItem) {
        toastItem.isExiting = true;
      }
    },
    dismissToast: (state, action: PayloadAction<string>) => {
      state.toastList = state.toastList.filter(
        (toast) => toast.id !== action.payload,
      );
    },
    clearToasts: (state) => {
      state.toastList = [];
    },
  },
});

export const selectToastList = (state: RootState) => state.toast.toastList;

export const { addToast, dismissToast, clearToasts, startToastExit } =
  toastSlice.actions;

export default toastSlice.reducer;
