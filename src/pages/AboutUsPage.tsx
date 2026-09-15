import { useLanguage } from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const AboutUsPage = () => {
  const { language } = useLanguage();
  return (
    <MainPageContainer heading={language.about}>
      <section>about</section>
    </MainPageContainer>
  );
};

export default AboutUsPage;
