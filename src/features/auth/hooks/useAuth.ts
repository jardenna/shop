import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../../app/hooks';
import { useCheckAuthQuery, useLogoutMutation } from '../authApiSlice';
import { setUser } from '../authSlice';
import { ShopPath } from '../../../layout/nav/enums';

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    data: userProfile,
    isLoading,
    refetch,
  } = useCheckAuthQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [sendLogout, { isSuccess: logoutSuccess }] = useLogoutMutation();

  useEffect(() => {
    if (!isLoading) {
      dispatch(setUser(userProfile ?? null));
    }
  }, [dispatch, isLoading, userProfile]);

  useEffect(() => {
    if (logoutSuccess) {
      navigate(ShopPath.Root, { replace: true });
    }
  }, [logoutSuccess]);

  const isAuthReady = !isLoading;
  const currentUser = userProfile?.user ?? null;
  const role = currentUser?.role ?? null;
  const isAdmin = Boolean(currentUser?.isAdmin);
  const isEmployee = role === 'Employee';

  return {
    currentUser,
    isAuthReady,
    role,
    isAdmin,
    isEmployee,
    isLoading,
    logout: sendLogout,
    onReset: refetch,
  };
};
