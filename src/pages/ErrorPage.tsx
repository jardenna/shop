import { FC } from 'react';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';
import ErrorContent from '../components/ErrorContent';
import useLanguage from '../features/language/useLanguage';

const ErrorPage: FC = () => {
  const error = useRouteError() as Error;
  const navigate = useNavigate();
  const { language } = useLanguage();

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  const handleGoback = () => {
    void navigate(-1);
  };

  return (
    <main className="error-page">
      <ErrorContent
        onClick={handleGoback}
        errorText={error.data as string}
        btnLabel={language.goBack}
      />
    </main>
  );
};

export default ErrorPage;
