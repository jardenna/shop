import { skipToken } from '@reduxjs/toolkit/query';
import { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import { useAppSelector } from '../../app/hooks';
import { selectCartList } from '../cartSlice';
import { useGetCartsQuery } from './cartApiSlice';

export const useActiveCart = ({
  currentUser,
}: {
  currentUser: UserResponse | null;
}) => {
  const {
    data: apiCartList,
    isLoading: isCartLoading,
    isError: isCartError,

    isSuccess: isCartSuccess,
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
    isCartSuccess,
  };
};
