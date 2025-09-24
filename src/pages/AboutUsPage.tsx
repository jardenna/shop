import Img from '../components/Img';
import useLanguage from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const AboutUsPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.aboutUs}>
      <section>
        <Img src="/images/about/about.jpg" alt="" />
      </section>
    </MainPageContainer>
  );
};

export default AboutUsPage;
