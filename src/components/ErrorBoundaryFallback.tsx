import { useLanguage } from '../features/language/useLanguage';
import ErrorContent from './ErrorContent';

// Props are automatically injected by react-error-boundary
interface FallbackProps {
  error?: any;
  resetErrorBoundary: () => void;
}

const ErrorBoundaryFallback = ({
  resetErrorBoundary,
  error,
}: FallbackProps) => {
  const { language } = useLanguage();

  console.error('Caught error in ErrorBoundary:', error);

  const errorText = error?.data?.message ?? language.somethingWentWrong;

  return (
    <ErrorContent
      onClick={resetErrorBoundary}
      errorText={errorText}

      btnLabel={language.retry}
    />
  );
};

export default ErrorBoundaryFallback;
