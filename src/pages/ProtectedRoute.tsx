import { Navigate, Outlet, useLocation } from 'react-router';
import { useCheckAuthQuery } from '../features/auth/authApiSlice';
import { MainPath } from '../layout/nav/enums';

const ProtectedRoute = () => {
  const location = useLocation();
  const { data: userProfile, isLoading } = useCheckAuthQuery();

  if (!isLoading && !userProfile) {
    return <Navigate to={MainPath.Login} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
