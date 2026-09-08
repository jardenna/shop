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
    isError: isApiCartError,
    refetch: refetchApiCartList,
    isSuccess: isApiCartSuccess,
  } = useGetCartQuery(currentUser ? undefined : skipToken);

  const cartList = useAppSelector(selectCartList);

  const {
    data: guestCart,
    isLoading: isGuestCartLoading,
    refetch: refetchGuestCart,
    isSuccess: isGuestCartSuccess,
    isError: isGuestCartError,
  } = useGetGuestCartQuery(shouldFetchGuestCart ? cartList : skipToken);

  const activeCartList =
    currentUser && apiCartList ? apiCartList.cartItems : cartList;

  const cartData = currentUser ? apiCartList : guestCart;
  const isCartLoading = currentUser ? isApiCartLoading : isGuestCartLoading;
  const isCartError = currentUser ? isApiCartError : isGuestCartError;
  const isCartSuccess = currentUser ? isApiCartSuccess : isGuestCartSuccess;
  const refetchCart = currentUser ? refetchApiCartList : refetchGuestCart;

  return {
    cartList,
    apiCartList,
    guestCart,
    refetchCart,
    cartData,
    activeCartList,
    isCartLoading,
    isCartError,
    isCartSuccess,
  };
};
