import LayoutElement from '../LayoutElement';
import { NavItemsProps } from './Nav';
import NavItem from './NavItem';

type NavItemListProps = {
  ariaLabel: string;
  navItemsList: NavItemsProps[];
  className?: string;
};

const NavItemList = ({
  navItemsList,
  ariaLabel,
  className = '',
}: NavItemListProps) => (
  <LayoutElement as="nav" ariaLabel={ariaLabel} className={className}>
    <ul className="nav-list">
      {navItemsList.map((navItem) => (
        <NavItem key={navItem.linkText} navItem={navItem} />
      ))}
    </ul>
  </LayoutElement>
);

export default NavItemList;
