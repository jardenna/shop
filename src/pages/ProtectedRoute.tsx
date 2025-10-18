import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from '../features/auth/hooks/useAuth';
import { ShopPath } from '../layout/nav/enums';
import { isAdminPath } from '../utils/utils';

const ProtectedRoute = () => {
  const location = useLocation();
  const { currentUser, isAdmin, isEmployee, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!currentUser) {
    return <Navigate to={ShopPath.Login} state={{ from: location }} replace />;
  }

  const isTryingToAccessAdmin = isAdminPath(location.pathname);

  if (isTryingToAccessAdmin && !isAdmin && !isEmployee) {
    return <Navigate to={ShopPath.Root} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
