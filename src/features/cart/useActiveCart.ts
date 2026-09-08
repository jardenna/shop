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
    isLoading: isApiCartLoading,
    isError: isCartError,
    refetch: refetchApiCartList,
    isSuccess: isCartSuccess,
  } = useGetCartQuery(currentUser ? undefined : skipToken);

  const cartList = useAppSelector(selectCartList);

  const {
    data: guestCart,
    isLoading: isGuestCartLoading,
    refetch: refetchGuestCart,
  } = useGetGuestCartQuery(shouldFetchGuestCart ? cartList : skipToken);

  const activeCartList =
    currentUser && apiCartList ? apiCartList.cartItems : cartList;

  return {
    cartList,
    apiCartList,
    guestCart,
    refetchGuestCart,
    activeCartList,
    isGuestCartLoading,
    isApiCartLoading,
    isCartError,
    isCartSuccess,
    refetchApiCartList,
  };
};
