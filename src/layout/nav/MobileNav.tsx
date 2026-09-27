import { useId } from 'react';
import Button from '../../components/Button';
import { useToggle } from '../../components/togglePanel/useToggle';
import PanelPopup from '../../features/cart/components/miniCartPopup/PanelPopup';
import { useLanguage } from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import NavContainer from './NavContainer';
import { NavListProps } from './navLists';

interface MobileNavProps {
  navList: NavListProps[];
  className?: string;
  navHeading?: string;
  onLogout?: () => void;
}

const MobileNav = ({
  navList,
  className,
  onLogout,
  navHeading,
}: MobileNavProps) => {
  const ariaControls = useId();
  const { language } = useLanguage();
  const { isPanelShown, onTogglePanel, onHidePanel } = useToggle();

  return (
    <>
      <Button
        variant={BtnVariant.Ghost}
        ariaExpanded={isPanelShown}
        onClick={onTogglePanel}
        ariaLabel={language.mainMenu}
        ariaHasPopup
        ariaControls={ariaControls}
        className="menu-burger"
      >
        <span className="menu-burger-item" aria-hidden />
      </Button>
      <PanelPopup
        onClosePanel={onHidePanel}
        isOpen={isPanelShown}
        ariaControls={ariaControls}
      >
        {navHeading && <div className="nav-heading">{navHeading}</div>}
        <NavContainer
          navList={navList}
          className={className}
          hideAriaHasPopup
          ariaLabel="main"
        />
        {onLogout && <Button onClick={onLogout}>{language.logout}</Button>}
      </PanelPopup>
    </>
  );
};

export default MobileNav;
