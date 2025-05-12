import useLanguage from '../features/language/useLanguage';
import Button from './Button';
import Img from './Img';

type ErrorContentProps = {
  btnLabel: string;
  errorText: string;

  onClick: () => void;
};

const ErrorContent = ({ onClick, errorText, btnLabel }: ErrorContentProps) => {
  const { language } = useLanguage();
  return (
    <section className="error">
      <Img
        className="emoji"
        src="/images/sad_smiley.png"
        alt={language.errorAltText}
      />
      <p className="error-info">{errorText}</p>
      <Button onClick={onClick}>{btnLabel}</Button>
    </section>
  );
};

export default ErrorContent;
