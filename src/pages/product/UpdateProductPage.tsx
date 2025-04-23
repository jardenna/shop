import useLanguage from '../../features/language/useLanguage';

const UpdateProductPage = () => {
  const { language } = useLanguage();
  return <section>{language.update}</section>;
};

export default UpdateProductPage;
