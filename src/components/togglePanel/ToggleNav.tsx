import { useId, type ReactNode } from 'react';
import { useLanguage } from '../../features/language/useLanguage';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useTrapFocus } from '../../hooks/useTrapFocus';
import { BtnVariant } from '../../types/enums';
import BtnClose from '../BtnClose';
import Button from '../Button';
import Overlay from '../overlay/Overlay';
import './_toggle-panel.scss';
import { useTogglePanel } from './useTogglePanel';

type ToggleNavProps = {
  children: ReactNode;
};

const ToggleNav = ({ children }: ToggleNavProps) => {
  const togglePanelId = useId();
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();
  const { isPanelShown, onTogglePanel, panelRef, onHidePanel } = useTogglePanel(
    { preventClickOutside: true },
  );

  useTrapFocus({ id: 'togglePanel', popupRef: panelRef });

  return (
    <>
      <Button
        variant={BtnVariant.Ghost}
        ariaExpanded={isPanelShown}
        onClick={onTogglePanel}
        ariaLabel={language.mainMenu}
        ariaHasPopup="menu"
        ariaControls={togglePanelId}
        className="menu-burger"
      >
        <span className="menu-burger-item" aria-hidden={true} />
      </Button>
      <div
        ref={panelRef}
        className={`toggle-panel ${isPanelShown ? 'shown' : ''}`}
        id={togglePanelId}
        aria-hidden={isPanelShown ? undefined : true}
      >
        {children}
        {isPanelShown && <BtnClose onClick={onHidePanel} />}
      </div>
      {isPanelShown && !isMobileSize && <Overlay />}
    </>
  );
};

export default ToggleNav;
