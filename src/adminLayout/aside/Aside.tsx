import { UserResponse } from '../../app/api/apiTypes/sharedApiTypes';
import NavContainer from '../../layout/nav/NavContainer';
import { adminNavList } from '../../layout/nav/navList';
import './_aside.scss';

export type AsideProps = {
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
      className="admin-nav"
      isMenuCollapsed={isShown}
      onCollapseMenu={onTogglePanel}
      ariaLabel={ariaLabel}
      currentUser={currentUser}
    />
  </aside>
);

export default Aside;
