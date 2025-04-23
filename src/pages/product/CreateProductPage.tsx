import useLanguage from '../../features/language/useLanguage';

const CreateProductPage = () => {
  const { language } = useLanguage();
  return <section>{language.create}</section>;
};

export default CreateProductPage;
