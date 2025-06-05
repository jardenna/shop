import useLanguage from '../../features/language/useLanguage';

const Kids = () => {
  const { language } = useLanguage();
  return <section>{language.kids}</section>;
};

export default Kids;
