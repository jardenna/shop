import NavContainer from '../../layout/nav/NavContainer';
import { adminNavList } from '../../layout/nav/navLists';
import './_aside.scss';

type AsideProps = {
  ariaLabel: string;
  isShown: boolean;
  onTogglePanel: () => void;
};

const Aside = ({ onTogglePanel, isShown, ariaLabel }: AsideProps) => (
  <aside className={`aside ${isShown ? 'collapsed' : ''}`}>
    <NavContainer
      navList={adminNavList}
      className="admin-nav-container"
      isMenuCollapsed={isShown}
      onCollapseMenu={onTogglePanel}
      ariaLabel={ariaLabel}
    />
  </aside>
);

export default Aside;
