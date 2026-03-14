import ToggleNav from '../../components/togglePanel/ToggleNav';
import { NavListProps } from './Nav';
import NavContainer from './NavContainer';

type MobileNavProps = {
  navList: NavListProps[];
  className?: string;
};

const MobileNav = ({ navList, className }: MobileNavProps) => (
  <ToggleNav>
    <NavContainer navList={navList} className={className} hideAriaHasPopup />
  </ToggleNav>
);

export default MobileNav;
