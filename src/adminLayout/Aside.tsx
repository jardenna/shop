import Nav from '../layout/nav/Nav';
import { adminNavList } from '../layout/nav/navList';

type AsideProps = {
  isMenuCollapsed: boolean;
  onCollapseMenu: () => void;
};

const Aside = ({ onCollapseMenu, isMenuCollapsed }: AsideProps) => (
  <aside className={`aside ${isMenuCollapsed ? 'collapsed' : ''}`}>
    <Nav
      navList={adminNavList}
      className="admin-nav"
      isMenuCollapsed={isMenuCollapsed}
      onCollapseMenu={onCollapseMenu}
    />
    link to shop
  </aside>
);

export default Aside;
