import useLanguage from '../../features/language/useLanguage';

const ViewProductPage = () => {
  const { language } = useLanguage();
  return <section>{language.add}dd</section>;
};

export default ViewProductPage;
