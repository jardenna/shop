import useLanguage from '../features/language/useLanguage';
import ErrorContent from './ErrorContent';

type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorBoundaryFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const { language } = useLanguage();

  return (
    <ErrorContent
      onClick={resetErrorBoundary}
      errorText={error.message}
      btnLabel={language.retry}
      className="error-boundary"
    />
  );
};

export default ErrorBoundaryFallback;
