import { useNavigate } from 'react-router';
import { useLanguage } from '../features/language/useLanguage';
import MetaTags from '../layout/MetaTags';
import Button from './Button';
import Picture from './Picture';

interface NotFoundErrorProps {
  error: any;
  btnLabel?: string;
  className?: string;
  path?: string;
}

const NotFoundError = ({
  path,
  error,
  btnLabel,
  className = '',
}: NotFoundErrorProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const errorText = error?.data?.message ?? language.somethingWentWrong;

  const src = '/images/icons/sad_smiley';
  const hasStatusCode = error?.status && error.status !== 'FETCH_ERROR';
  const metaErrorText = `${language.error} ${hasStatusCode ? error.status : undefined}`;

  return (
    <>
      <MetaTags metaTitle={metaErrorText} />
      <section className={`error-content ${className}`}>
        <Picture
          className="emoji"
          src={`${src}.png`}
          srcSet={`${src}.avif`}
          alt={language.errorAltText}
        />

        <div className="flex">
          {hasStatusCode && <span className="error-code">{error.status}</span>}
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
    </>
  );
};

export default NotFoundError;
