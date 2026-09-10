import { useLanguage } from '../features/language/useLanguage';
import MetaTags from '../layout/MetaTags';
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
  const hasStatusCode = error?.status && error.status !== 'FETCH_ERROR';
  const metaErrorText =
    `${language.error} ${hasStatusCode ? error.status : ''}`.trim();

  return (
    <>
      <MetaTags metaTitle={metaErrorText} />
      <ErrorContent
        onClick={resetErrorBoundary}
        errorText={errorText}
        btnLabel={language.retry}
      />
    </>
  );
};

export default ErrorBoundaryFallback;
