import { IconName } from '../../types/enums';
import LayoutElement from '../LayoutElement';
import { LinkText } from './enums';
import NavItem from './NavItem';

export type SubNavAdContentProps = {
  alt: string;
  heading: string;
  src: string;
};

export type BaseNav = {
  linkText: LinkText;
  path: string;
  iconName?: IconName;
  iconSize?: string;
  infoText?: string;
  subNavAdContent?: SubNavAdContentProps;
};

export type NavItemsProps = BaseNav & {
  subNav?: BaseNav[];
};

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
