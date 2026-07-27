import { skipToken } from '@reduxjs/toolkit/query';
import { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import { useAppSelector } from '../../app/hooks';
import { selectCartList } from '../cartSlice';
import { useGetCartQuery } from './cartApiSlice';

interface UseActiveCartProps {
  currentUser: UserResponse | null;
}

export const useActiveCart = ({ currentUser }: UseActiveCartProps) => {
  const {
    data: apiCartList,
    isLoading: isCartLoading,
    isError: isCartError,
    refetch: refetchApiCartList,
    isSuccess: isCartSuccess,
  } = useGetCartQuery(currentUser ? undefined : skipToken);

  const cartList = useAppSelector(selectCartList);

  const activeCartList =
    currentUser && apiCartList ? apiCartList.cartItems : cartList;

  return {
    cartList,
    apiCartList,
    activeCartList,
    isCartLoading,
    isCartError,
    isCartSuccess,
    refetchApiCartList,
  };
};
