import { skipToken } from '@reduxjs/toolkit/query';
import { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import { useAppSelector } from '../../app/hooks';
import { selectCartList } from '../cartSlice';
import { useGetCartQuery } from './cartApiSlice';

interface UseActiveCartProps {
  currentUser: UserResponse | null;
  isAuthReady: boolean;
  promoCode?: string;
}

export const useActiveCart = ({
  currentUser,
  promoCode,
}: UseActiveCartProps) => {
  const {
    data: apiCartList,
    isLoading: isCartLoading,
    isError: isCartError,
    isSuccess: isCartSuccess,
  } = useGetCartQuery(currentUser ? promoCode : skipToken);

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
  };
};
