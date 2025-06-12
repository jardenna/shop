import { NavLink } from 'react-router';
import useLanguage from '../../../features/language/useLanguage';
import useMediaQuery from '../../../hooks/useMediaQuery ';
import { BaseNav } from '../Nav';
import './_sub-nav.scss';

type SubNavProps = {
  adHeading: string;
  subNav: BaseNav[];
  className?: string;
};

const SubNav = ({ subNav, adHeading, className = '' }: SubNavProps) => {
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();

  return (
    <div className={`sub-nav-container ${className}`}>
      <ul className="sub-nav">
        {subNav.map(({ linkText, path, infoText, className = '' }) =>
          isMobileSize ? (
            <li key={linkText} className="sub-nav-item">
              <NavLink to={path}>{language[linkText]}</NavLink>
            </li>
          ) : (
            <li className={`sub-nav-item ${className}`} key={linkText}>
              <section className="sub-nav-content">
                <h2 className="sub-nav-heading">{language[linkText]}</h2>
                <p className="sub-nav-text">
                  {infoText ? language[infoText] : ''}
                </p>
              </section>
              <div className="sub-nav-link">
                <NavLink to={path} className="btn btn-primary">
                  {language.shopNow}
                </NavLink>
              </div>
            </li>
          ),
        )}
        <li className="sub-nav-item sub-nav-ad">
          <p className="ad-heading">{language[adHeading]}.</p>
        </li>
      </ul>
    </div>
  );
};
export default SubNav;
