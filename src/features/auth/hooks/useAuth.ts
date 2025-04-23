import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { MainPath } from '../../../layout/nav/enums';
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
  } = useCheckAuthQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      navigate(MainPath.Root);
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
    isLoading,
    error,
    logout: sendLogout,
  };
};

export default useAuth;
