import useLanguage from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const Contact = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.collection}>Contact</MainPageContainer>
  );
};

export default Contact;
