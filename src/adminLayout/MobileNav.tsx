import Button from '../components/Button';
import Nav from '../layout/nav/Nav';
import { adminNavList } from '../layout/nav/navList';
import { BtnVariant } from '../types/enums';

type MobileNavProps = {
  ariaLabel: string;
  className: string;
  isPanelHidden: boolean;
  onTogglePanel: () => void;
};

const MobileNav = ({
  ariaLabel,
  onTogglePanel,
  isPanelHidden,
  className,
}: MobileNavProps) => (
  <>
    <Button
      className="menu-burger"
      variant={BtnVariant.Ghost}
      ariaExpanded={isPanelHidden}
      onClick={onTogglePanel}
      ariaLabel={ariaLabel}
    >
      <span className="menu-burger-item" aria-hidden={true} />
    </Button>
    <Nav navList={adminNavList} className={`admin-nav ${className}`} />
  </>
);

export default MobileNav;
