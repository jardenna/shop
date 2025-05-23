import LayoutElement from '../LayoutElement';
import { NavItemsProps } from './Nav';
import NavItem from './NavItem';

type NavItemListProps = {
  ariaLabel: string;
  navItemsList: NavItemsProps[];
};

const NavItemList = ({ navItemsList, ariaLabel }: NavItemListProps) => (
  <LayoutElement as="nav" ariaLabel={ariaLabel} className="nav">
    <ul className="nav-list">
      {navItemsList.map((navItem) => (
        <NavItem key={navItem.linkText} navItem={navItem} />
      ))}
    </ul>
  </LayoutElement>
);

export default NavItemList;
