import { Navigate, Outlet, useLocation } from 'react-router';
import { useCheckAuthQuery } from '../features/auth/authApiSlice';
import { AdminPath, ShopPath } from '../layout/nav/enums';

const ProtectedRoute = () => {
  const location = useLocation();
  const { data: userProfile, isLoading } = useCheckAuthQuery();

  const isAuthenticated = !!userProfile;
  const isUser = userProfile?.user.role === 'User';

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={ShopPath.Login} state={{ from: location }} replace />;
  }

  const isTryingToAccessAdmin = location.pathname.startsWith(
    `/${AdminPath.Admin}`,
  );

  if (isTryingToAccessAdmin && isUser) {
    return <Navigate to={ShopPath.Root} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
