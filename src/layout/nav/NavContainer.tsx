import type { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import IconBtn from '../../components/IconBtn';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import './_nav.scss';
import Nav, { NavItemsProps } from './Nav';
import NavUser from './NavUser';

type NavContainerProps = {
  navList: NavItemsProps[];
  ariaControls?: string;
  ariaLabel?: string;
  className?: string;
  currentUser?: UserResponse | null;
  hideAria?: boolean;
  isMenuCollapsed?: boolean;
  onCollapseMenu?: () => void;
};

const NavContainer = ({
  navList,
  isMenuCollapsed,
  onCollapseMenu,
  className = 'main-nav',
  ariaLabel,
  currentUser,
  ariaControls,
  hideAria,
}: NavContainerProps) => {
  const { language } = useLanguage();

  return (
    <section className={className} id={ariaControls}>
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
        <NavUser currentUser={currentUser} iconTitle={language.user} />
      )}
    </section>
  );
};

export default NavContainer;
