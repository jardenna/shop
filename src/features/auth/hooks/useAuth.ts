import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { useCheckAuthQuery, useLogoutMutation } from '../authApiSlice';
import { setUser } from '../authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const {
    data: userProfile,
    isLoading,
    refetch,
  } = useCheckAuthQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [sendLogout] = useLogoutMutation();

  useEffect(() => {
    if (!isLoading) {
      dispatch(setUser(userProfile ?? null));
    }
  }, [dispatch, isLoading, userProfile]);

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
    refetch,
  };
};
