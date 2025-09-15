import IconBtn from '../../components/IconBtn';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import './_nav.scss';
import type { NavItemsProps } from './Nav';
import Nav from './Nav';
import NavUser from './NavUser';

type NavContainerProps = {
  navList: NavItemsProps[];
  ariaControls?: string;
  ariaLabel?: string;
  className?: string;
  hideAria?: boolean;
  isMenuCollapsed?: boolean;
  onCollapseMenu?: () => void;
};

const NavContainer = ({
  navList,
  isMenuCollapsed,
  onCollapseMenu,
  className = 'main-nav-container',
  ariaLabel,
  ariaControls,
  hideAria,
}: NavContainerProps) => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <section
      className={`nav-container ${className || 'main-nav-container'}`}
      id={ariaControls}
    >
      <Nav
        navItemsList={navList}
        ariaLabel={language.main}
        hideAria={hideAria}
      />
      {onCollapseMenu && (
        <IconBtn
          onClick={onCollapseMenu}
          ariaLabel={ariaLabel}
          iconName={IconName.ChevronLeft}
          title="Chevron left"
          ariaExpanded={!isMenuCollapsed}
        />
      )}
      {currentUser && (
        <NavUser
          currentUser={currentUser}
          iconTitle={language.user}
          isMenuCollapsed={isMenuCollapsed}
        />
      )}
    </section>
  );
};

export default NavContainer;
