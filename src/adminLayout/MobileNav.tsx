import { UserResponse } from '../app/api/apiTypes';
import Button from '../components/Button';
import NavContainer from '../layout/nav/NavContainer';
import { adminNavList } from '../layout/nav/navList';
import { BtnVariant } from '../types/enums';

export type AdminNavProps = {
  ariaControls: string;
  ariaLabel: string;
  className: string;
  currentUser: UserResponse | null;
  isShown: boolean;
  onToggleHidden: () => void;
};

const MobileNav = ({
  ariaLabel,
  onToggleHidden,
  isShown,
  className,
  currentUser,
  ariaControls,
}: AdminNavProps) => (
  <>
    <Button
      className="menu-burger"
      variant={BtnVariant.Ghost}
      ariaExpanded={isShown}
      onClick={onToggleHidden}
      ariaLabel={ariaLabel}
      ariaHasPopup
      ariaControls={ariaControls}
    >
      <span className="menu-burger-item" aria-hidden={true} />
    </Button>
    <NavContainer
      ariaControls={ariaControls}
      navList={adminNavList}
      className={`admin-nav ${className}`}
      currentUser={currentUser}
    />
  </>
);

export default MobileNav;
