import { FC } from 'react';
import { NavLink } from 'react-router';
import { NavItemsProps } from './NavItemList';

interface NavItemProps {
  navItem: NavItemsProps;
}

const NavItem: FC<NavItemProps> = ({ navItem }) => (
  <li key={navItem.linkText}>
    <NavLink to={navItem.path} className="nav-item">
      {navItem.linkText}
    </NavLink>
  </li>
);

export default NavItem;
