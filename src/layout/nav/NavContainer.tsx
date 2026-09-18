import { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import './_nav.scss';
import type { NavProps } from './Nav';
import Nav from './Nav';
import NavUser from './NavUser';

interface NavContainerProps extends NavProps {
  currentUser?: UserResponse | null;
  isMenuCollapsed?: boolean;
}

const NavContainer = ({
  navList,
  isMenuCollapsed,
  currentUser,
  ariaLabel,
  className = 'main-nav-container',
  hideAriaHasPopup,
}: NavContainerProps) => (
  <>
    <Nav
      navList={navList}
      className={className || 'main-nav-container'}
      hideAriaHasPopup={hideAriaHasPopup}
      ariaLabel={ariaLabel}
    />
    {currentUser && (
      <NavUser currentUser={currentUser} isMenuCollapsed={isMenuCollapsed} />
    )}
  </>
);

export default NavContainer;
