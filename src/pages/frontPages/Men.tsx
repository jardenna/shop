import useLanguage from '../../features/language/useLanguage';

const Men = () => {
  const { language } = useLanguage();
  return <section className="container page">{language.men}</section>;
};

export default Men;
