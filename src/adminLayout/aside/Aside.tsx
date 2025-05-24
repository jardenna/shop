import { UserResponse } from '../../app/api/apiTypes';
import NavContainer from '../../layout/nav/NavContainer';
import { adminNavList } from '../../layout/nav/navList';
import './_aside.scss';

export type AsideProps = {
  ariaLabel: string;
  currentUser: UserResponse | null;
  isShown: boolean;
  onToggleHidden: () => void;
};

const Aside = ({
  onToggleHidden,
  isShown,
  ariaLabel,
  currentUser,
}: AsideProps) => (
  <aside className={`aside ${isShown ? 'collapsed' : ''}`}>
    <NavContainer
      navList={adminNavList}
      className="admin-nav"
      isMenuCollapsed={isShown}
      onCollapseMenu={onToggleHidden}
      ariaLabel={ariaLabel}
      currentUser={currentUser}
    />
  </aside>
);

export default Aside;
