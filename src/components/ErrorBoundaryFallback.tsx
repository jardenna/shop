import useLanguage from '../features/language/useLanguage';
import ErrorContent from './ErrorContent';

type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorBoundaryFallback = ({ resetErrorBoundary }: FallbackProps) => {
  const { language } = useLanguage();

  return (
    <ErrorContent
      onClick={resetErrorBoundary}
      errorText={language.somethingWentWrong}
      btnLabel={language.retry}
      className="error-boundary"
    />
  );
};

export default ErrorBoundaryFallback;
