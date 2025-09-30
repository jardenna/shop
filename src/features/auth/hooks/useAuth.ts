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

  const protectedRoutes = ['/dashboard', '/users'];
  const requiresAuth = protectedRoutes.includes(location.pathname);

  const {
    data: userProfile,
    isLoading,
    error,
  } = useCheckAuthQuery(undefined, {
    skip: !requiresAuth, // skip query for public routes
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess && requiresAuth) {
      navigate(ShopPath.Root);
    }
  }, [isSuccess, navigate, requiresAuth]);

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
    error,
    logout: sendLogout,
  };
};

export default useAuth;
