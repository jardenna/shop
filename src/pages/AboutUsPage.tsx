import ConvertingGuide from '../components/sizeGuide/ConvertingGuide';
import SizeGuide from '../components/sizeGuide/SizeGuide';
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
