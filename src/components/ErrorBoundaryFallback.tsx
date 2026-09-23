import { useLanguage } from '../features/language/useLanguage';
import MetaTags from '../layout/MetaTags';
import { BtnVariant } from '../types/enums';
import Button from './Button';
import ErrorContent from './ErrorContent';

// Props are automatically injected by react-error-boundary
interface FallbackProps {
  error?: any;
  variant?: 'default' | 'small';
  resetErrorBoundary: () => void;
}

const ErrorBoundaryFallback = ({
  resetErrorBoundary,
  error,
  variant = 'default',
}: FallbackProps) => {
  const { language } = useLanguage();

  console.error('Caught error in ErrorBoundary:', error);

  const errorText = error?.data?.message ?? language.somethingWentWrong;
  const hasStatusCode = error?.status && error.status !== 'FETCH_ERROR';
  const metaErrorText =
    `${language.error} ${hasStatusCode ? error.status : ''}`.trim();

  if (variant === 'small') {
    return (
      <div className="error-content small">
        <MetaTags metaTitle={metaErrorText} />
        <span className="error-text">{errorText}</span>
        <Button variant={BtnVariant.Ghost} onClick={resetErrorBoundary}>
          {language.retry}
        </Button>
      </div>
    );
  }

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
