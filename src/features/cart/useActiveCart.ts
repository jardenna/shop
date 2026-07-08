import { skipToken } from '@reduxjs/toolkit/query';
import { useAppSelector } from '../../app/hooks';
import { useAuth } from '../auth/hooks/useAuth';
import { selectCartList } from '../cartSlice';
import { useGetCartsQuery } from './cartApiSlice';

export const useActiveCart = () => {
  const { currentUser } = useAuth();

  const {
    data: apiCartList,
    isLoading: isCartLoading,
    isError: isCartError,
  } = useGetCartsQuery(currentUser ? undefined : skipToken);

  const cartList = useAppSelector(selectCartList);
  const productIds = cartList.map((list) => list.productId);

  const activeCartList =
    currentUser && apiCartList ? apiCartList.cartItems : cartList;

  return {
    cartList,
    apiCartList,
    productIds,
    activeCartList,
    isCartLoading,
    isCartError,
  };
};
