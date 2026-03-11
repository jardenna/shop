import ToggleNav from '../../components/togglePanel/ToggleNav';
import { NavListProps } from './Nav';
import NavContainer from './NavContainer';

export type AdminNavProps = {
  navList: NavListProps[];
  className?: string;
};

const MobileNav = ({ navList, className }: AdminNavProps) => (
  <ToggleNav>
    <NavContainer navList={navList} className={className} hideAriaHasPopup />
  </ToggleNav>
);

export default MobileNav;
