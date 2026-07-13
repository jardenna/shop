import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CartItem,
  UpdateCartQtyRequest,
} from '../app/api/apiTypes/cartApiTypes';
import { RootState } from '../app/store';
import { cartStorageUtil } from './cart/utils/cartStorageUtil';

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
    updateGuestCartQty: (
      state,
      action: PayloadAction<UpdateCartQtyRequest>,
    ) => {
      const cartItem = state.cartList.find(
        (item) => item.id === action.payload.cartItemId,
      );

      if (!cartItem) {
        return;
      }

      cartItem.qty = action.payload.qty;

      cartStorageUtil.save(state.cartList);
    },
    deleteGuestCartItem: (state, action: PayloadAction<string>) => {
      state.cartList = state.cartList.filter(
        (cart) => cart.id !== action.payload,
      );

      cartStorageUtil.save(state.cartList);
    },
  },
});

export const {
  addCartItem,
  replaceCartItem,
  deleteGuestCartItem,
  updateGuestCartQty,
} = cartSlice.actions;

export const selectCartList = (state: RootState) => state.cartList.cartList;

export default cartSlice.reducer;
