import IconBtn from '../../components/IconBtn';
import useAuth from '../../features/auth/hooks/useAuth';
import NavContainer from '../../layout/nav/NavContainer';
import { adminNavList } from '../../layout/nav/navLists';
import { IconName } from '../../types/enums';
import './_aside.scss';

type AsideProps = {
  ariaLabel: string;
  isShown: boolean;
  onTogglePanel: () => void;
};

const Aside = ({ onTogglePanel, isShown, ariaLabel }: AsideProps) => {
  const { currentUser } = useAuth();

  return (
    <aside className={`aside ${isShown ? 'collapsed' : ''}`}>
      <NavContainer
        navList={adminNavList}
        className="admin-nav-container"
        isMenuCollapsed={isShown}
        onCollapseMenu={onTogglePanel}
        ariaLabel={ariaLabel}
        currentUser={currentUser}
      />
      <IconBtn
        onClick={onTogglePanel}
        ariaLabel={ariaLabel}
        iconName={IconName.ChevronLeft}
        title="Chevron left"
        ariaExpanded={!isShown}
      />
    </aside>
  );
};
export default Aside;
