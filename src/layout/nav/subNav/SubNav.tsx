import { NavLink } from 'react-router';
import Img from '../../../components/Img';
import useLanguage from '../../../features/language/useLanguage';
import { LinkText, MainPath } from '../enums';
import './_sub-menu.scss';

const subNav = [
  {
    path: MainPath.Root,
    linkText: LinkText.Women,
    infoText: 'Opdag stilfulde nyheder, must-haves og sæsonens trends.',
  },
  {
    path: MainPath.Collection,
    linkText: LinkText.Men,
    infoText: 'Fra hverdagslook til formelt, alt til den moderne mand.',
  },
  {
    path: MainPath.Collection,
    linkText: LinkText.Kids,
    infoText: 'Komfortabelt og sjovt tøj til leg, skole og eventyr.',
  },
];

const SubNav = () => {
  const { language } = useLanguage();

  return (
    <div className="sub-menu-container">
      <article className="sub-menu">
        <div className="grid-line" />
        <section className="menu-item img-item">
          <Img
            src="/images/ad.png"
            alt={language.discoverLatestTrendsAltText}
          />
          <div>
            <h2>{language.discoverLatestTrends}.</h2>
          </div>
        </section>
        {subNav.map(({ linkText, path, infoText }) => (
          <section className="menu-item" key={linkText}>
            <h2 className="link-heading">{language[linkText]}</h2>
            <p className="link-text">{infoText}</p>
            <div className="nav-link">
              <NavLink to={path} className="btn btn-primary">
                {language.shopNow}
              </NavLink>
            </div>
          </section>
        ))}
      </article>
    </div>
  );
};
export default SubNav;
