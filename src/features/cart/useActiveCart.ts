import { skipToken } from '@reduxjs/toolkit/query';
import { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import { useAppSelector } from '../../app/hooks';
import { selectCartList } from '../cartSlice';
import { useGetCartQuery, useGetGuestCartQuery } from './cartApiSlice';

interface UseActiveCartProps {
  currentUser: UserResponse | null;
  isAuthReady: boolean;
}

export const useActiveCart = ({
  currentUser,
  isAuthReady,
}: UseActiveCartProps) => {
  const shouldFetchGuestCart = isAuthReady && !currentUser;

  const {
    data: apiCartList,
    isError: isApiCartError,
    isFetching,
    refetch: refetchApiCartList,
  } = useGetCartQuery(currentUser ? undefined : skipToken);

  const cartList = useAppSelector(selectCartList);

  const {
    data: guestCart,
    refetch: refetchGuestCart,
    isError: isGuestCartError,
  } = useGetGuestCartQuery(shouldFetchGuestCart ? cartList : skipToken);

  const activeCartList =
    currentUser && apiCartList ? apiCartList.cartItems : cartList;

  const cartData = currentUser ? apiCartList : guestCart;
  const isCartError = currentUser ? isApiCartError : isGuestCartError;
  const refetchCart = currentUser ? refetchApiCartList : refetchGuestCart;

  return {
    cartList,
    apiCartList,
    refetchCart,
    cartData,
    activeCartList,
    isCartError,
    isFetching,
  };
};
