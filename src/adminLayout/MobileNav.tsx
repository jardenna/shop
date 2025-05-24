import { UserResponse } from '../app/api/apiTypes';
import TogglePanel from '../components/TogglePanel';
import NavContainer from '../layout/nav/NavContainer';
import { adminNavList } from '../layout/nav/navList';

export type AdminNavProps = {
  ariaControls: string;
  currentUser: UserResponse | null;
};

const MobileNav = ({ currentUser, ariaControls }: AdminNavProps) => (
  <TogglePanel ariaControls={ariaControls}>
    <NavContainer
      ariaControls={ariaControls}
      navList={adminNavList}
      className="admin-nav"
      currentUser={currentUser}
    />
  </TogglePanel>
);

export default MobileNav;
