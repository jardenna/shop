import useLanguage from '../../features/language/useLanguage';

const Kids = () => {
  const { language } = useLanguage();
  return <section className="container page">{language.kids}</section>;
};

export default Kids;
