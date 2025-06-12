import { IconName } from '../../types/enums';
import LayoutElement from '../LayoutElement';
import { LinkText } from './enums';
import NavItem from './NavItem';

export type BaseNav = {
  linkText: LinkText;
  path: string;
  adHeading?: string;
  className?: string;
  iconName?: IconName;
  iconSize?: string;
  infoText?: string;
};

export type NavItemsProps = BaseNav & {
  subNav?: BaseNav[];
};

type NavProps = {
  ariaLabel: string;
  navItemsList: NavItemsProps[];
  hideAria?: boolean;
};

const Nav = ({ navItemsList, ariaLabel, hideAria }: NavProps) => (
  <LayoutElement as="nav" ariaLabel={ariaLabel} className="nav">
    <ul className="nav-list">
      {navItemsList.map((navItem) => (
        <NavItem key={navItem.linkText} navItem={navItem} hideAria={hideAria} />
      ))}
    </ul>
  </LayoutElement>
);

export default Nav;
