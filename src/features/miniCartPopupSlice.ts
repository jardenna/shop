import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface MiniCartState {
  isOpen: boolean;
}

const initialState: MiniCartState = {
  isOpen: false,
};

const miniCartPopupSlice = createSlice({
  name: 'miniCartPopupSlice',
  initialState,
  reducers: {
    openMiniCart: (state) => {
      state.isOpen = true;
    },
    closeMiniCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const selectIsMiniCartOpen = (state: RootState) =>
  state.miniCartIsOpen.isOpen;
export const { openMiniCart, closeMiniCart } = miniCartPopupSlice.actions;

export default miniCartPopupSlice.reducer;
