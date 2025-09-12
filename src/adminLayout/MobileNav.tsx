import TogglePanel from '../components/togglePanel/TogglePanel';
import useAuth from '../features/auth/hooks/useAuth';
import { NavItemsProps } from '../layout/nav/Nav';
import NavContainer from '../layout/nav/NavContainer';

export type AdminNavProps = {
  navList: NavItemsProps[];
};

const MobileNav = ({ navList }: AdminNavProps) => {
  const { currentUser } = useAuth();
  const ariaControls = 'nav';

  return (
    <TogglePanel
      ariaControls={ariaControls}
      preventClickOutside
      triggerBtnClassName="menu-burger"
    >
      <NavContainer
        ariaControls={ariaControls}
        navList={navList}
        className="dashboard-nav"
        currentUser={currentUser}
      />
    </TogglePanel>
  );
};

export default MobileNav;
