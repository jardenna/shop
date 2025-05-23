import LayoutElement from '../LayoutElement';
import { NavItemsProps } from './NavContainer';
import NavItem from './NavItem';

type NavProps = {
  ariaLabel: string;
  navItemsList: NavItemsProps[];
};

const Nav = ({ navItemsList, ariaLabel }: NavProps) => (
  <LayoutElement as="nav" ariaLabel={ariaLabel} className="nav">
    <ul className="nav-list">
      {navItemsList.map((navItem) => (
        <NavItem key={navItem.linkText} navItem={navItem} />
      ))}
    </ul>
  </LayoutElement>
);

export default Nav;
