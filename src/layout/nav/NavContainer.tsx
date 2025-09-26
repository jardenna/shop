import { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import useLanguage from '../../features/language/useLanguage';
import './_nav.scss';
import type { NavItemsProps } from './Nav';
import Nav from './Nav';
import NavUser from './NavUser';

type NavContainerProps = {
  navList: NavItemsProps[];
  ariaLabel?: string;
  className?: string;
  currentUser?: UserResponse | null;
  hideAriaHasPopup?: boolean;
  isMenuCollapsed?: boolean;
  onCollapseMenu?: () => void;
};

const NavContainer = ({
  navList,
  isMenuCollapsed,
  currentUser,
  className = 'main-nav-container',
  ariaLabel,
  hideAriaHasPopup,
}: NavContainerProps) => {
  const { language } = useLanguage();

  return (
    <>
      <Nav
        navList={navList}
        ariaLabel={ariaLabel || language.main}
        className={className || 'main-nav-container'}
        hideAriaHasPopup={hideAriaHasPopup}
      />
      {currentUser && (
        <NavUser
          currentUser={currentUser}
          iconTitle={language.user}
          isMenuCollapsed={isMenuCollapsed}
        />
      )}
    </>
  );
};

export default NavContainer;
