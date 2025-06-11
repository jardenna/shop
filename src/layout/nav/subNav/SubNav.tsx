import { NavLink } from 'react-router';
import useLanguage from '../../../features/language/useLanguage';
import useMediaQuery from '../../../hooks/useMediaQuery ';
import { BaseNav } from '../Nav';
import './_sub-nav.scss';
import SubNavAd from './SubNavAd';

type SubNavProps = {
  adHeading: string;
  subNav: BaseNav[];
};

const SubNav = ({ subNav, adHeading }: SubNavProps) => {
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();

  return (
    <div className="sub-nav-container">
      <ul className="sub-nav">
        {subNav.map(({ linkText, path, infoText, className = '' }) =>
          isMobileSize ? (
            <li key={linkText}>
              <NavLink to={path}>{language[linkText]}</NavLink>
            </li>
          ) : (
            <li className={`sub-nav-item ${className}`} key={linkText}>
              <h2 className="sub-nav-heading">{language[linkText]}</h2>
              <p className="sub-nav-text">
                {infoText ? language[infoText] : ''}
              </p>
              <div className="sub-nav-link">
                <NavLink to={path} className="btn btn-primary">
                  {language.shopNow}
                </NavLink>
              </div>
            </li>
          ),
        )}
        <li className="sub-nav-item sub-nav-ad">
          <SubNavAd heading={language[adHeading]} />
        </li>
      </ul>
    </div>
  );
};
export default SubNav;
