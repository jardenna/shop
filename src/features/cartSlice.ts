import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../app/api/apiTypes/cartApiTypes';
import { RootState } from '../app/store';
import { cartStorageUtil } from './cart/cartStorageUtil';

interface CartItemsState {
  cartList: CartItem[];
}

const initialState: CartItemsState = {
  cartList: cartStorageUtil.load(),
};

const cartSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<CartItem>) => {
      state.cartList.push(action.payload);

      cartStorageUtil.save(state.cartList);
    },

    replaceCartItem: (state, action: PayloadAction<CartItem[]>) => {
      state.cartList = action.payload;

      cartStorageUtil.save(state.cartList);
    },
  },
});

export const { addCartItem, replaceCartItem } = cartSlice.actions;

export const selectCartList = (state: RootState) => state.cartList.cartList;

export default cartSlice.reducer;
