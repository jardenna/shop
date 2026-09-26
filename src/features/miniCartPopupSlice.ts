import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface MiniCartState {
  isOpen: boolean;
}

const initialState: MiniCartState = {
  isOpen: false,
};

const miniCartPopupSlice = createSlice({
  name: 'miniCartPopup',
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

export const selectIsMiniCartOpen = (state: RootState) => state.miniCart.isOpen;

export const { openMiniCart, closeMiniCart } = miniCartPopupSlice.actions;

export default miniCartPopupSlice.reducer;
