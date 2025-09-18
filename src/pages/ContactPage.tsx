import Button from '../components/Button';
import ImageBackground from '../components/imageBackground/ImageBackground';
import useLanguage from '../features/language/useLanguage';
import { BtnVariant } from '../types/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const ContactPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.contact}>
      <ImageBackground
        alt="kids"
        src="/images/fashion_fusion_banner.png"
        srcSet="/images/fashion_fusion_banner.avif"
        className="hero"
      >
        <section className="hero-content">
          <h1 className="hero-title">{language.heroTitle}</h1>
          <div className="hero-text">
            <p>{language.heroText}</p>
            <p>{language.heroText1}</p>
          </div>
          <div className="hero-btn-container">
            <span className="hero-btn-decoration" />
            <Button variant={BtnVariant.Ghost}>
              <span>{language.shopNow}</span>
            </Button>
          </div>
        </section>
      </ImageBackground>
    </MainPageContainer>
  );
};

export default ContactPage;
