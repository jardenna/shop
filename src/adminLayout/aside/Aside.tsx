import NavContainer from '../../layout/nav/NavContainer';
import { adminNavList } from '../../layout/nav/navList';
import { AdminNavProps } from '../MobileNav';
import './_aside.scss';

type OmittedAdminNavProps = Omit<AdminNavProps, 'className' | 'ariaControls'>;

const Aside = ({
  onToggleHidden,
  isShown,
  ariaLabel,
  currentUser,
}: OmittedAdminNavProps) => (
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
