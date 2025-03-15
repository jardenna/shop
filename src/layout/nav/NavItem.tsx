import { FC } from 'react';
import { NavLink } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { NavItemsProps } from './NavItemList';

interface NavItemProps {
  navItem: NavItemsProps;
}

const NavItem: FC<NavItemProps> = ({ navItem }) => {
  const { language } = useLanguage();

  return (
    <li key={navItem.linkText}>
      <NavLink to={navItem.path} className="nav-item">
        {language[navItem.linkText]}
      </NavLink>
    </li>
  );
};

export default NavItem;
