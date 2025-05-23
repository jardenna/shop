import NavContainer from '../../layout/nav/NavContainer';
import { adminNavList } from '../../layout/nav/navList';
import './_aside.scss';

type AsideProps = {
  ariaLabel: string;
  isMenuCollapsed: boolean;
  onCollapseMenu: () => void;
};

const Aside = ({ onCollapseMenu, isMenuCollapsed, ariaLabel }: AsideProps) => (
  <aside className={`aside ${isMenuCollapsed ? 'collapsed' : ''}`}>
    <NavContainer
      navList={adminNavList}
      className="admin-nav"
      isMenuCollapsed={isMenuCollapsed}
      onCollapseMenu={onCollapseMenu}
      ariaLabel={ariaLabel}
    />
  </aside>
);

export default Aside;
