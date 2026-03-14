import { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import './_nav.scss';
import type { NavProps } from './Nav';
import Nav from './Nav';
import NavUser from './NavUser';

type NavContainerProps = NavProps & {
  currentUser?: UserResponse | null;
  isMenuCollapsed?: boolean;
};

const NavContainer = ({
  navList,
  isMenuCollapsed,
  currentUser,
  className = 'main-nav-container',
  hideAriaHasPopup,
}: NavContainerProps) => (
  <>
    <Nav
      navList={navList}
      className={className || 'main-nav-container'}
      hideAriaHasPopup={hideAriaHasPopup}
    />
    {currentUser && (
      <NavUser currentUser={currentUser} isMenuCollapsed={isMenuCollapsed} />
    )}
  </>
);

export default NavContainer;
