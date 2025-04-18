import { NavLink } from 'react-router';
import Icon from '../../components/icons/Icon';
import useLanguage from '../../features/language/useLanguage';
import { NavItemsProps } from './Nav';

const NavItem = ({ navItem }: { navItem: NavItemsProps }) => {
  const { language } = useLanguage();

  return (
    <li>
      <NavLink to={navItem.path} className="nav-item">
        {navItem.iconName && (
          <span aria-hidden={true}>
            <Icon
              iconName={navItem.iconName}
              title={language[navItem.linkText]}
            />
          </span>
        )}
        <span className="nav-text">{language[navItem.linkText]}</span>
      </NavLink>
    </li>
  );
};

export default NavItem;
