import Button from '../../components/Button';
import ImageBackground from '../../components/imageBackground/ImageBackground';
import useLanguage from '../../features/language/useLanguage';
import useMediaQuery from '../../hooks/useMediaQuery ';
import { BtnVariant } from '../../types/enums';
import './_hero.scss';

const Hero = () => {
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();
  return (
    <ImageBackground
      alt="kids"
      src="/images/fashion_fusion_banner.png"
      srcSet="/images/fashion_fusion_banner.avif"
      className="hero"
      hidePicture={isMobileSize}
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
  );
};

export default Hero;
