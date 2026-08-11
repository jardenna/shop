import { useLanguage } from '../features/language/useLanguage';
import Button from './Button';
import { BaseFallbackProps } from './ErrorBoundaryFallback';
import Picture from './Picture';

interface ErrorContentProps extends BaseFallbackProps {
  errorText: string;
  errorCode?: number;
  onClick: () => void;
}

const ErrorContent = ({
  onClick,
  errorText,
  errorCode,
  btnLabel,
  className = '',
}: ErrorContentProps) => {
  const { language } = useLanguage();

  const src = '/images/icons/sad_smiley';
  return (
    <section className={`error-content ${className}`}>
      <Picture
        className="emoji"
        src={`${src}.png`}
        srcSet={`${src}.avif`}
        alt={language.errorAltText}
      />

      <div className="flex">
        {errorCode && <span className="error-code">{errorCode}</span>}
        <h1 className="error-info">{errorText}</h1>
      </div>
      <Button onClick={onClick}>{btnLabel}</Button>
    </section>
  );
};

export default ErrorContent;
