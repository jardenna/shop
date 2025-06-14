import useLanguage from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const Contact = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.contact}>Contact</MainPageContainer>
  );
};

export default Contact;
