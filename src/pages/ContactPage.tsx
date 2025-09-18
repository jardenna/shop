import useLanguage from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const ContactPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.contact}>contact</MainPageContainer>
  );
};

export default ContactPage;
