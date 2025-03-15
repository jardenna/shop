import { FC } from 'react';
import LayoutElement from '../LayoutElement';
import { NavItemsProps } from './Nav';
import NavItem from './NavItem';

interface NavItemListProps {
  ariaLabel: string;
  navItemsList: NavItemsProps[];
  className?: string;
}

const NavItemList: FC<NavItemListProps> = ({
  navItemsList,
  ariaLabel,
  className = '',
}) => (
  <LayoutElement as="nav" ariaLabel={ariaLabel} className={className}>
    <ul className="nav-list">
      {navItemsList.map((navItem) => (
        <NavItem key={navItem.linkText} navItem={navItem} />
      ))}
    </ul>
  </LayoutElement>
);

export default NavItemList;
