import { NavLink } from 'react-router';
import { useLanguage } from '../../features/language/useLanguage';
import { NavProps } from '../nav/Nav';

interface FooterNavProps extends NavProps {
  title: string;
}

const FooterNav = ({ navList, title }: FooterNavProps) => {
  const { language } = useLanguage();

  return (
    <nav aria-label={title} className="footer-nav">
      <h2 className="footer-nav-title">{title}</h2>
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
    </nav>
  );
};

export default FooterNav;
