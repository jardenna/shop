import type { UserResponse } from '../app/api/apiTypes/adminApiTypes';
import TogglePanel from '../components/togglePanel/TogglePanel';
import NavContainer from '../layout/nav/NavContainer';
import { adminNavList } from '../layout/nav/navLists';

export type AdminNavProps = {
  ariaControls: string;
  currentUser: UserResponse | null;
};

const MobileNav = ({ currentUser, ariaControls }: AdminNavProps) => (
  <TogglePanel ariaControls={ariaControls}>
    <NavContainer
      ariaControls={ariaControls}
      navList={adminNavList}
      className="dashboard-nav"
      currentUser={currentUser}
    />
  </TogglePanel>
);

export default MobileNav;
