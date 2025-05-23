import { UserResponse } from '../app/api/apiTypes';
import Button from '../components/Button';
import NavContainer from '../layout/nav/NavContainer';
import { adminNavList } from '../layout/nav/navList';
import { BtnVariant } from '../types/enums';

export type AdminNavProps = {
  ariaLabel: string;
  className: string;
  currentUser: UserResponse | null;
  isHidden: boolean;
  onToggleHidden: () => void;
};

const MobileNav = ({
  ariaLabel,
  onToggleHidden,
  isHidden,
  className,
  currentUser,
}: AdminNavProps) => (
  <>
    <Button
      className="menu-burger"
      variant={BtnVariant.Ghost}
      ariaExpanded={isHidden}
      onClick={onToggleHidden}
      ariaLabel={ariaLabel}
    >
      <span className="menu-burger-item" aria-hidden={true} />
    </Button>
    <NavContainer
      navList={adminNavList}
      className={`admin-nav ${className}`}
      currentUser={currentUser}
    />
  </>
);

export default MobileNav;
