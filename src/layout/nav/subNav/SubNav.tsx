import { NavLink } from 'react-router';
import useLanguage from '../../../features/language/useLanguage';
import { BaseNav, SubNavAdContentProps } from '../Nav';
import './_sub-nav.scss';
import SubNavAd from './SubNavAd';

type SubNavProps = {
  subNav: BaseNav[];
  subNavAdContent: SubNavAdContentProps;
};

const SubNav = ({ subNav, subNavAdContent }: SubNavProps) => {
  const { language } = useLanguage();
  const { heading, src, alt } = subNavAdContent;

  return (
    <div className="sub-nav-container">
      <ul className="sub-nav">
        <li className="top-line" aria-hidden={true} />
        <li className="sub-nav-item img-item">
          <SubNavAd heading={language[heading]} src={src} alt={language[alt]} />
        </li>
        {subNav.map(({ linkText, path, infoText, className }) => (
          <li className={`sub-nav-item ${className}`} key={linkText}>
            <h2 className="sub-nav-heading">{language[linkText]}</h2>
            <p className="sub-nav-text">{infoText ? language[infoText] : ''}</p>
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
