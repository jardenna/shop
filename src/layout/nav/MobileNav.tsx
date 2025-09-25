import TogglePanel from '../../components/togglePanel/TogglePanel';
import { NavItemsProps } from './Nav';
import NavContainer from './NavContainer';

export type AdminNavProps = {
  navList: NavItemsProps[];
  className?: string;
};

const MobileNav = ({ navList, className }: AdminNavProps) => (
  <TogglePanel
    ariaControls="nav"
    preventClickOutside
    triggerBtnClassName="menu-burger"
  >
    <NavContainer navList={navList} className={className} />
  </TogglePanel>
);

export default MobileNav;
