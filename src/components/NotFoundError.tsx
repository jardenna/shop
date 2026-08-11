import { useNavigate } from 'react-router';
import { useLanguage } from '../features/language/useLanguage';
import Button from './Button';
import Picture from './Picture';

interface NotFoundErrorProps {
  error: any;
  btnLabel?: string;
  path?: string;
}

const NotFoundError = ({ path, error, btnLabel }: NotFoundErrorProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const errorText = error?.data?.message ?? language.somethingWentWrong;
  const src = '/images/icons/sad_smiley';

  return (
    <section className="error-content">
      <Picture
        className="emoji"
        src={`${src}.png`}
        srcSet={`${src}.avif`}
        alt={language.errorAltText}
      />

      <div className="flex">
        {error.status !== 'FETCH_ERROR' && (
          <span className="error-code">{error.status}</span>
        )}
        <h1 className="error-info">{errorText}</h1>
      </div>
      <Button
        onClick={() => {
          if (path) {
            navigate(path);
          } else {
            navigate(-1);
          }
        }}
      >
        {btnLabel
          ? `${language.goBackTo} ${language[btnLabel]}`
          : language.goBack}
      </Button>
    </section>
  );
};

export default NotFoundError;
