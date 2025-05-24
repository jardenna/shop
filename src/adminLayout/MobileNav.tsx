import { UserResponse } from '../app/api/apiTypes';
import TogglePanel from '../components/TogglePanel';
import NavContainer from '../layout/nav/NavContainer';
import { adminNavList } from '../layout/nav/navList';

export type AdminNavProps = {
  ariaControls: string;
  ariaLabel: string;
  className: string;
  currentUser: UserResponse | null;
  isShown: boolean;
  onToggleHidden: () => void;
};

const MobileNav = ({
  ariaLabel,
  className,
  currentUser,
  ariaControls,
}: AdminNavProps) => (
  <TogglePanel ariaControls={ariaControls} ariaLabel={ariaLabel}>
    <NavContainer
      ariaControls={ariaControls}
      navList={adminNavList}
      className={`admin-nav ${className}`}
      currentUser={currentUser}
    />
  </TogglePanel>
);

export default MobileNav;
