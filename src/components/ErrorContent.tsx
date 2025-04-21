import useLanguage from '../features/language/useLanguage';
import LayoutElement from '../layout/LayoutElement';
import Button from './Button';

type ErrorContentProps = {
  btnLabel: string;
  errorText: string;
  className?: string;
  onClick: () => void;
};

const ErrorContent = ({
  onClick,
  errorText,
  btnLabel,
  className = '',
}: ErrorContentProps) => {
  const { language } = useLanguage();
  return (
    <section className={`error ${className}`}>
      <img
        className="emoji"
        src="/images/sad_smiley.png"
        alt={language.errorAltText}
        loading="lazy"
      />
      <LayoutElement as="header" ariaLabel={language.error}>
        <h2 className="error-info">{errorText}</h2>
      </LayoutElement>
      <Button onClick={onClick}>{btnLabel}</Button>
    </section>
  );
};

export default ErrorContent;
