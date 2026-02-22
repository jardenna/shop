import { useId } from 'react';
import { NavLink } from 'react-router';
import type { SubBaseNav } from '../Nav';
import NavAd from '../NavAd';

type SubNavListDesktoptProps = {
  heading: string;
  language: Record<string, string>;
  subNavList: SubBaseNav[];
};

const SubNavListDesktop = ({
  subNavList,
  heading,
  language,
}: SubNavListDesktoptProps) => {
  const subNavId = useId();

  return (
    <ul className="sub-nav">
      {subNavList.map(({ linkText, infoText, path, className = '' }) => (
        <li className={`sub-nav-item ${className}`} key={linkText}>
          <section className="sub-nav-content" aria-labelledby={subNavId}>
            <h2 id={subNavId} className="sub-nav-heading">
              {language[linkText]}
            </h2>
            <p className="sub-nav-text">{language[infoText]}</p>
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
        alt={language.desktopAltText}
        imgExtention="png"
      />
    </ul>
  );
};
export default SubNavListDesktop;
