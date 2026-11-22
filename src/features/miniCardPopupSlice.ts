import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface MiniCardState {
  isOpen: boolean;
}

const initialState: MiniCardState = {
  isOpen: false,
};

const miniCardPopupSlice = createSlice({
  name: 'miniCardPopup',
  initialState,
  reducers: {
    openMiniCard: (state) => {
      state.isOpen = true;
    },
    closeMiniCard: (state) => {
      state.isOpen = false;
    },
  },
});

export const selectIsMiniCardOpen = (state: RootState) => state.miniCard.isOpen;

export const { openMiniCard, closeMiniCard } = miniCardPopupSlice.actions;

export default miniCardPopupSlice.reducer;
