import useLanguage from '../../features/language/useLanguage';

const Women = () => {
  const { language } = useLanguage();
  return <section className="container page">{language.women}</section>;
};

export default Women;
