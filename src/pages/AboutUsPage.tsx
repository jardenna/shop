import ConvertingGuide from '../components/ConvertingGuide';
import SizeGuide from '../components/SizeGuide';
import { useLanguage } from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const AboutUsPage = () => {
  const { language } = useLanguage();
  return (
    <MainPageContainer heading={language.about}>
      <ConvertingGuide />
      <SizeGuide />
      <section>about</section>
    </MainPageContainer>
  );
};

export default AboutUsPage;
