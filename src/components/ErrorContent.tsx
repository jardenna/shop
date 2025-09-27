import useLanguage from '../features/language/useLanguage';
import Button from './Button';
import Picture from './Picture';

type ErrorContentProps = {
  btnLabel: string;
  errorText: string;
  onClick: () => void;
};

const ErrorContent = ({ onClick, errorText, btnLabel }: ErrorContentProps) => {
  const { language } = useLanguage();

  const src = '/images/icons/sad_smiley';
  return (
    <section className="error-content">
      <Picture
        src={`${src}.png`}
        srcSet={`${src}.avif`}
        alt={language.errorAltText}
      />

      <p className="error-info">{errorText}</p>
      <Button onClick={onClick}>{btnLabel}</Button>
    </section>
  );
};

export default ErrorContent;
