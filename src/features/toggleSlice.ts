import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

type ToggleState = {
  toggleId: string | null;
};

const initialState: ToggleState = {
  toggleId: null,
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleElement: (state, action: PayloadAction<string | null>) => {
      state.toggleId = action.payload;
    },
  },
});

export const { toggleElement } = toggleSlice.actions;
export const selectToggleId = (state: RootState) => state.toggle.toggleId;
export default toggleSlice.reducer;
