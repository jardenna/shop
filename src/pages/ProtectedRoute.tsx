import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { MainPath } from '../layout/nav/enums';

const ProtectedRoute: React.FC = () => {
  const location = useLocation();

  const isLoading = false;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!isLoading) {
    return <Navigate to={MainPath.Login} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
