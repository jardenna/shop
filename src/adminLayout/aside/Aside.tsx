import type { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import NavContainer from '../../layout/nav/NavContainer';
import { adminNavList } from '../../layout/nav/navLists';
import './_aside.scss';

type AsideProps = {
  ariaLabel: string;
  currentUser: UserResponse | null;
  isShown: boolean;
  onTogglePanel: () => void;
};

const Aside = ({
  onTogglePanel,
  isShown,
  ariaLabel,
  currentUser,
}: AsideProps) => (
  <aside className={`aside ${isShown ? 'collapsed' : ''}`}>
    <NavContainer
      navList={adminNavList}
      className="nav-container admin-nav"
      isMenuCollapsed={isShown}
      onCollapseMenu={onTogglePanel}
      ariaLabel={ariaLabel}
      currentUser={currentUser}
    />
  </aside>
);

export default Aside;
