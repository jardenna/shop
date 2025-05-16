import { Navigate, Outlet, useLocation } from 'react-router';
import { useCheckAuthQuery } from '../features/auth/authApiSlice';
import { MainPath } from '../layout/nav/enums';

const ProtectedRoute = () => {
  const location = useLocation();
  const { data: userProfile, isLoading } = useCheckAuthQuery();

  const isAuthenticated = !!userProfile;
  const isUser = userProfile?.user.role === 'User';

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={MainPath.Login} state={{ from: location }} replace />;
  }

  const isTryingToAccessAdmin = location.pathname.startsWith(
    `/${MainPath.Admin}`,
  );

  if (isTryingToAccessAdmin && isUser) {
    return <Navigate to={MainPath.Root} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
