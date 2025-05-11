import useLanguage from '../features/language/useLanguage';
import LayoutElement from '../layout/LayoutElement';
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
      <LayoutElement as="header" ariaLabel={language.error}>
        <h2 className="error-info">{errorText}</h2>
      </LayoutElement>
      <Button onClick={onClick}>{btnLabel}</Button>
    </section>
  );
};

export default ErrorContent;
