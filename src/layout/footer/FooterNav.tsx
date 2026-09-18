import { NavLink } from 'react-router';
import { useLanguage } from '../../features/language/useLanguage';
import LayoutElement from '../LayoutElement';
import { BaseNav } from '../nav/navLists';

interface FooterNavProps {
  heading: string;
  navList: BaseNav[];
}

const FooterNav = ({ navList, heading }: FooterNavProps) => {
  const { language } = useLanguage();

  return (
    <LayoutElement ariaLabel={heading} className="footer-nav">
      <h2 className="footer-nav-heading">{heading}</h2>
      <ul className="footer-nav-list">
        {navList.map(({ linkText, path }) => (
          <li key={linkText}>
            <NavLink
              to={path}

              className="footer-nav-item"
            >
              {language[linkText]}
            </NavLink>
          </li>
        ))}
      </ul>
    </LayoutElement>
  );
};

export default FooterNav;
