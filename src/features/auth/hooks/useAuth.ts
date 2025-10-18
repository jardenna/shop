import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../../app/hooks';
import { ShopPath } from '../../../layout/nav/enums';
import { useCheckAuthQuery, useLogoutMutation } from '../authApiSlice';
import { setUser } from '../authSlice';

const useAuth = () => {
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
      if (userProfile) {
        dispatch(setUser(userProfile));
      } else {
        dispatch(setUser(null));
      }
    }
  }, [userProfile, isLoading, dispatch]);

  useEffect(() => {
    if (logoutSuccess) {
      navigate(ShopPath.Root, { replace: true });
    }
  }, [logoutSuccess, navigate]);

  const currentUser = userProfile?.user ?? null;

  const role = currentUser?.role ?? null;
  const isAdmin = !!currentUser?.isAdmin;
  const isEmployee = role === 'Employee';

  return {
    currentUser,
    role,
    isAdmin,
    isEmployee,
    isLoading,
    logout: sendLogout,
    onReset: refetch,
  };
};

export default useAuth;
