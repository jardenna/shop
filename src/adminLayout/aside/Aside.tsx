import IconBtn from '../../components/IconBtn';
import { useAuth } from '../../features/auth/hooks/useAuth';
import NavContainer from '../../layout/nav/NavContainer';
import { adminNavList } from '../../layout/nav/navLists';
import { IconName } from '../../types/enums';
import './_aside.scss';

interface AsideProps {
  ariaLabel: string;
  isShown: boolean;
  onTogglePanel: () => void;
}

const Aside = ({ onTogglePanel, isShown, ariaLabel }: AsideProps) => {
  const { currentUser } = useAuth();

  return (
    <aside className={`aside ${isShown ? 'collapsed' : ''}`}>
      <NavContainer
        navList={adminNavList}
        isMenuCollapsed={isShown}
        currentUser={currentUser}
        ariaLabel="main"
        className="admin-nav"
      />
      <IconBtn
        onClick={onTogglePanel}
        ariaLabel={ariaLabel}
        iconName={IconName.ChevronLeft}
        ariaExpanded={!isShown}
      />
    </aside>
  );
};

export default Aside;
