import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ShopPath } from '../../../layout/nav/enums';
import { useCheckAuthQuery, useLogoutMutation } from '../authApiSlice';
import { selectUser, setUser } from '../authSlice';

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const [sendLogout, { isSuccess }] = useLogoutMutation();

  const {
    data: userProfile,
    isLoading,
    error,
    refetch,
  } = useCheckAuthQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      navigate(ShopPath.Root);
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (!isLoading) {
      if (userProfile) {
        dispatch(setUser(userProfile));
      } else {
        dispatch(setUser(null));
      }
    }
  }, [userProfile, isLoading, error, dispatch]);

  return {
    currentUser: currentUser?.user,
    isAdmin: currentUser?.user.isAdmin,
    isLoading,
    logout: sendLogout,
    onReset: refetch,
  };
};

export default useAuth;
