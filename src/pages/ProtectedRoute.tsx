import { Navigate, Outlet, useLocation } from 'react-router';
import { useCheckAuthQuery } from '../features/auth/authApiSlice';
import { MainPath } from '../layout/nav/enums';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';

const ProtectedRoute = () => {
  const location = useLocation();
  const { data: userProfile, isLoading } = useCheckAuthQuery();

  if (!isLoading && !userProfile) {
    return <Navigate to={MainPath.Login} state={{ from: location }} replace />;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <Outlet />
    </ErrorBoundary>
  );
};

export default ProtectedRoute;
