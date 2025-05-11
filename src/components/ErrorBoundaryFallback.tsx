import useLanguage from '../features/language/useLanguage';
import ErrorContent from './ErrorContent';

type FallbackProps = {
  resetErrorBoundary: () => void;
};

const ErrorBoundaryFallback = ({ resetErrorBoundary }: FallbackProps) => {
  const { language } = useLanguage();

  return (
    <ErrorContent
      onClick={resetErrorBoundary}
      errorText={language.somethingWentWrong}
      btnLabel={language.retry}
    />
  );
};

export default ErrorBoundaryFallback;
