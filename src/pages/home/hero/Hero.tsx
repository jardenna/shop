import ImageBackground from '../../../components/imageBackground/ImageBackground';
import { useLanguage } from '../../../features/language/useLanguage';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import './_hero.scss';

const Hero = () => {
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();
  const ariaLabeldBy = 'hero';

  return (
    <ImageBackground
      alt={language.heroAltText}
      src="/images/banners/home_banner.png"
      srcSet="/images/banners/home_banner.avif"
      className="hero"
      as="section"
      hidePicture={isMobileSize}
      ariaLabelledby={ariaLabeldBy}
      ratio="16:9"
      priority
    >
      <div className="hero-content">
        <h1 className="hero-title" id={ariaLabeldBy}>
          {language.heroTitle}
        </h1>
        <div className="hero-text">
          <p>{language.heroText}</p>
        </div>
      </div>
    </ImageBackground>
  );
};

export default Hero;
