import { NavLink } from 'react-router';
import { BaseNav } from '../Nav';
import NavAd from '../NavAd';

type SubNavListDesktoptProps = {
  heading: string;
  language: Record<string, string>;
  subNavList: BaseNav[];
};

const SubNavListDesktop = ({
  subNavList,
  heading,
  language,
}: SubNavListDesktoptProps) => (
  <ul className="sub-nav">
    {subNavList.map(({ linkText, infoText, path, className = '' }) => (
      <li className={`sub-nav-item ${className}`} key={linkText}>
        <section className="sub-nav-content">
          <h2 className="sub-nav-heading">{language[linkText]}</h2>
          <p className="sub-nav-text">{infoText ? language[infoText] : ''}</p>
        </section>
        <div className="sub-nav-link">
          <NavLink to={path} className="btn btn-primary">
            {language[linkText]}
          </NavLink>
        </div>
      </li>
    ))}
    <NavAd
      heading={language[heading]}
      imageName="ad"
      alt={language.desktopAdAltText}
    />
  </ul>
);

export default SubNavListDesktop;
