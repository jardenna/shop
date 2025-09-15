import TogglePanel from '../components/togglePanel/TogglePanel';
import { NavItemsProps } from '../layout/nav/Nav';
import NavContainer from '../layout/nav/NavContainer';

export type AdminNavProps = {
  navList: NavItemsProps[];
  className?: string;
};

const MobileNav = ({ navList, className }: AdminNavProps) => {
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
        className={className}
      />
    </TogglePanel>
  );
};

export default MobileNav;
