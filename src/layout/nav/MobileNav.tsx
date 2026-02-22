import TogglePanel from '../../components/togglePanel/TogglePanel';
import { NavListProps } from './Nav';
import NavContainer from './NavContainer';

export type AdminNavProps = {
  navList: NavListProps[];
  className?: string;
};

const MobileNav = ({ navList, className }: AdminNavProps) => (
  <TogglePanel
    preventClickOutside
    triggerBtnClassName="menu-burger"
    ariaHasPopup="menu"
  >
    <NavContainer navList={navList} className={className} hideAriaHasPopup />
  </TogglePanel>
);

export default MobileNav;
