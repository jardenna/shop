import Button from '../../components/Button';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import './_hero.scss';

const Hero = () => {
  const { language } = useLanguage();
  return (
    <div className="hero">
      <div className="container">
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
      </div>
    </div>
  );
};

export default Hero;
