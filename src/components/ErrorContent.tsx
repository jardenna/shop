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
  return (
    <section className="error-content">
      <Picture
        srcSet="/images/icons/sad_smiley.avif"
        alt={language.errorAltText}
        src="/images/icons/sad_smiley.png"
      />

      <p className="error-info">{errorText}</p>
      <Button onClick={onClick}>{btnLabel}</Button>
    </section>
  );
};

export default ErrorContent;
