import { FC } from 'react';
import { Outlet } from 'react-router';
import Button from '../components/Button';
import useLanguage from '../features/language/useLanguage';
import { BtnVariant } from '../types/enums';

const LayoutHome: FC = () => {
  const { language } = useLanguage();
  return (
    <>
      <div className="hero">
        <div className="container">
          <section className="hero-content">
            <h1 className="hero-title">{language.heroTitle}</h1>
            <div className="hero-text">
              <p>{language.heroText}</p>
              <p>{language.heroText1}</p>
            </div>
            <Button variant={BtnVariant.Ghost}>
              <span>{language.shopNow}</span>
            </Button>
          </section>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default LayoutHome;
