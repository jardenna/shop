import { useEffect, useId, useRef } from 'react';
import { useLocation } from 'react-router';
import Button from '../../components/Button';
import Overlay from '../../components/overlay/Overlay';
import Panel from '../../components/panel/Panel';
import TriggerPanelButton from '../../components/panel/TriggerPanelButton';
import { useTogglePanel } from '../../components/panel/useTogglePanel';
import { useLanguage } from '../../features/language/useLanguage';
import { useScrollLock } from '../../hooks/useScrollLock';
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
  const { isPanelShown, onTogglePanel, onHidePanel } = useTogglePanel();
  const location = useLocation();

  useScrollLock(isPanelShown);

  useEffect(() => {
    onHidePanel();
  }, [location.pathname]);

  return (
    <>
      <div ref={menuButtonRef}>
        <TriggerPanelButton
          ariaExpanded={isPanelShown}
          onTogglePanel={onTogglePanel}
          ariaLabel={language.mainMenu}
          ariaControls={ariaControls}
          className="menu-burger"
        >
          <span className="menu-burger-item" aria-hidden />
        </TriggerPanelButton>
      </div>

      <Panel
        portalId="mobile-nav"
        onClosePanel={onHidePanel}
        isPanelShown={isPanelShown}
        ariaControls={ariaControls}
        trapFocus
        ignoreRefs={[menuButtonRef]}
        className="mobile-nav"
        hideCloseBtn
      >
        {navHeading && <div className="nav-heading">{navHeading}</div>}
        <NavContainer
          className={className}
          navList={navList}
          hideAriaHasPopup
          ariaLabel="main"
        />
        {onLogout && <Button onClick={onLogout}>{language.logout}</Button>}
      </Panel>

      <Overlay isOverlayShown={isPanelShown} />
    </>
  );
};

export default MobileNav;
