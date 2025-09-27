import { IconName } from '../../types/enums';
import LayoutElement from '../LayoutElement';
import { LinkText } from './enums';
import NavItem from './NavItem';

export type BaseNav = {
  linkText: LinkText;
  path: string;
  className?: string;
  end?: boolean;
  heading?: string;
  iconName?: IconName;
};

type OmittedBaseNav = Omit<BaseNav, 'end' | 'heading' | 'iconName'>;

export type SubBaseNav = OmittedBaseNav & {
  infoText: string;
};

export type NavItemsProps = BaseNav & {
  subNavList?: SubBaseNav[];
};

export type NavProps = {
  ariaLabel: string;
  navList: NavItemsProps[];
  className?: string;
  hideAriaHasPopup?: boolean;
};

const Nav = ({ navList, ariaLabel, className, hideAriaHasPopup }: NavProps) => (
  <LayoutElement as="nav" ariaLabel={ariaLabel} className={className}>
    <ul className="nav-list">
      {navList.map((navItem) => (
        <NavItem
          key={navItem.linkText}
          navItem={navItem}
          hideAriaHasPopup={hideAriaHasPopup}
        />
      ))}
    </ul>
  </LayoutElement>
);

export default Nav;
