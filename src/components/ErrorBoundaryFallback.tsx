import { useLanguage } from '../features/language/useLanguage';
import ErrorContent from './ErrorContent';

// Props are automatically injected by react-error-boundary
type FallbackProps = {
  btnLabel?: string;
  error?: any;
  resetErrorBoundary: () => void;
};

const ErrorBoundaryFallback = ({
  resetErrorBoundary,
  error,
  btnLabel,
}: FallbackProps) => {
  const { language } = useLanguage();

  console.error('Caught error in ErrorBoundary:', error);

  const errorText = error?.data?.message ?? language.somethingWentWrong;

  return (
    <ErrorContent
      onClick={resetErrorBoundary}
      errorText={errorText}
      errorCode={error.status}
      btnLabel={!btnLabel ? language.retry : btnLabel}
    />
  );
};

export default ErrorBoundaryFallback;
