import useLanguage from '../../features/language/useLanguage';
import './_skip-links.scss';

const SkipLink = () => {
  const { language } = useLanguage();

  return (
    <a className="skip-link" href="#main">
      {language.goToContent}
    </a>
  );
};

export default SkipLink;
