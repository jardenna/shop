import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { ToastTypes } from '../components/toast/toastConfig';

export interface Toastprops {
  message: string;
  count?: number;
  id?: string;
  isExiting?: boolean;
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
      const toastType = action.payload.type ?? 'success';

      const existingToast = state.toastList.find(
        (toast) =>
          toast.message === action.payload.message &&
          (toast.type ?? 'success') === toastType,
      );

      if (existingToast) {
        existingToast.count = (existingToast.count ?? 1) + 1;
        return;
      }

      state.toastList.unshift({
        ...action.payload,
        id: nanoid(),
        type: toastType,
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
    clearErrorToasts: (state) => {
      state.toastList = state.toastList.filter(
        (toast) => (toast.type ?? 'success') !== 'error',
      );
    },
  },
});

export const selectToastList = (state: RootState) => state.toast.toastList;

export const { addToast, dismissToast, clearErrorToasts, startToastExit } =
  toastSlice.actions;

export default toastSlice.reducer;
