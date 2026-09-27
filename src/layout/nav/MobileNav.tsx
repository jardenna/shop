import { useId, useRef } from 'react';
import Button from '../../components/Button';
import Overlay from '../../components/overlay/Overlay';
import { useToggle } from '../../components/togglePanel/useToggle';
import PanelPopup from '../../features/cart/components/miniCartPopup/PanelPopup';
import { useLanguage } from '../../features/language/useLanguage';
import { useScrollLock } from '../../hooks/useScrollLock';
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
  className = '',
  onLogout,
  navHeading,
}: MobileNavProps) => {
  const ariaControls = useId();
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const { isPanelShown, onTogglePanel, onHidePanel } = useToggle();

  useScrollLock(isPanelShown);

  return (
    <>
      <div ref={menuButtonRef}>
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
      </div>

      <PanelPopup
        onClosePanel={onHidePanel}
        isOpen={isPanelShown}
        ariaControls={ariaControls}
        trapFocus
        ignoreRefs={[menuButtonRef]}
        className={`mobile-nav ${className}`}
        hideBtnClose
      >
        {navHeading && <div className="nav-heading">{navHeading}</div>}
        <NavContainer navList={navList} hideAriaHasPopup ariaLabel="main" />
        {onLogout && <Button onClick={onLogout}>{language.logout}</Button>}
      </PanelPopup>

      {isPanelShown && <Overlay />}
    </>
  );
};

export default MobileNav;
