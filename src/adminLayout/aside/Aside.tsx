import NavContainer from '../../layout/nav/NavContainer';
import { adminNavList } from '../../layout/nav/navList';
import { AdminNavProps } from '../MobileNav';
import './_aside.scss';

export type OmittedUserRequest = Omit<AdminNavProps, 'className'>;

const Aside = ({
  onToggleHidden,
  isHidden,
  ariaLabel,
  currentUser,
}: OmittedUserRequest) => (
  <aside className={`aside ${isHidden ? 'collapsed' : ''}`}>
    <NavContainer
      navList={adminNavList}
      className="admin-nav"
      isMenuCollapsed={isHidden}
      onCollapseMenu={onToggleHidden}
      ariaLabel={ariaLabel}
      currentUser={currentUser}
    />
  </aside>
);

export default Aside;
