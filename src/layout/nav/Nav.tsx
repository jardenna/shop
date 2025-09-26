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
  subNavList?: BaseNav[];
};

type NavProps = {
  ariaLabel: string;
  navList: NavItemsProps[];
  className?: string;
};

const Nav = ({ navList, ariaLabel, className }: NavProps) => (
  <LayoutElement as="nav" ariaLabel={ariaLabel} className={className}>
    <ul className="nav-list">
      {navList.map((navItem) => (
        <NavItem key={navItem.linkText} navItem={navItem} />
      ))}
    </ul>
  </LayoutElement>
);

export default Nav;
