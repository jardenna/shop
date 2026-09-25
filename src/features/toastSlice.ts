import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToastTypes = 'success' | 'info' | 'warning' | 'error';

interface Toastprops {
  count: number;
  id: string;
  message: string;
  toastId: string;
  type: ToastTypes;
}

export interface ToastState {
  count: number;
  toastList: Toastprops[];
}

const initialState: ToastState = {
  toastList: [],
  count: 1,
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

// export const selectToastList = (state:RootState) => state.to

export const { addToast, dismissToast, clearToasts } = toastSlice.actions;

export default toastSlice.reducer;
