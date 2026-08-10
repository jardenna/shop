import { useLanguage } from '../features/language/useLanguage';
import Button from './Button';
import Picture from './Picture';

type ErrorContentProps = {
  btnLabel: string;
  errorText: string;
  errorCode?: number;
  onClick: () => void;
};

const ErrorContent = ({
  onClick,
  errorText,
  errorCode,
  btnLabel,
}: ErrorContentProps) => {
  const { language } = useLanguage();

  const src = '/images/icons/sad_smiley';
  return (
    <section className="error-content">
      <Picture
        className="emoji"
        src={`${src}.png`}
        srcSet={`${src}.avif`}
        alt={language.errorAltText}
      />
      {errorCode && <span>{errorCode}</span>}
      <h1 className="error-info">{errorText}</h1>

      <Button onClick={onClick}>{btnLabel}</Button>
    </section>
  );
};

export default ErrorContent;
