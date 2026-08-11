import { useLanguage } from '../features/language/useLanguage';
import ErrorContent from './ErrorContent';

export interface BaseFallbackProps {
  btnLabel?: string;
  className?: string;
}

// Props are automatically injected by react-error-boundary
interface FallbackProps extends BaseFallbackProps {
  error?: any;
  resetErrorBoundary: () => void;
}

const ErrorBoundaryFallback = ({
  resetErrorBoundary,
  error,
  btnLabel,
  className,
}: FallbackProps) => {
  const { language } = useLanguage();

  console.error('Caught error in ErrorBoundary:', error);

  const errorText = error?.data?.message ?? language.somethingWentWrong;

  return (
    <ErrorContent
      className={className}
      onClick={resetErrorBoundary}
      errorText={errorText}
      errorCode={error.status}
      btnLabel={!btnLabel ? language.retry : btnLabel}
    />
  );
};

export default ErrorBoundaryFallback;
