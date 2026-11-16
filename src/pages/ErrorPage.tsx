import { isRouteErrorResponse, useRouteError } from 'react-router';
import NotFoundError from '../components/NotFoundError';

const ErrorPage = () => {
  const error = useRouteError() as Error;

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  return (
    <div className="error-page">
      <NotFoundError error={error} />
    </div>
  );
};

export default ErrorPage;
