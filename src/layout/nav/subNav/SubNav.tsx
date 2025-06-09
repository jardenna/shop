import { NavLink } from 'react-router';
import Img from '../../../components/Img';
import useLanguage from '../../../features/language/useLanguage';
import { LinkText, MainPath } from '../enums';
import './_sub-nav.scss';

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
    <div className="sub-nav-container">
      <ul className="sub-nav">
        <div className="top-line" />
        <li className="sub-nav-item img-item">
          <Img
            src="/images/ad.png"
            alt={language.discoverLatestTrendsAltText}
          />
          <div>
            <h2>{language.discoverLatestTrends}.</h2>
          </div>
        </li>
        {subNav.map(({ linkText, path, infoText }) => (
          <li className="sub-nav-item" key={linkText}>
            <h2 className="sub-nav-heading">{language[linkText]}</h2>
            <p className="sub-nav-text">{infoText}</p>
            <div className="sub-nav-link">
              <NavLink to={path} className="btn btn-primary">
                {language.shopNow}
              </NavLink>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SubNav;
