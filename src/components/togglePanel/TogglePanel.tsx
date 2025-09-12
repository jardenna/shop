import { ReactNode } from 'react';
import useLanguage from '../../features/language/useLanguage';
import useMediaQuery from '../../hooks/useMediaQuery ';
import useTrapFocus from '../../hooks/useTrapFocus';
import { BtnVariant } from '../../types/enums';
import BtnClose from '../BtnClose';
import Button from '../Button';
import Overlay from '../overlay/Overlay';
import './_toggle-panel.scss';
import useTogglePanel from './useTogglePanel';

type PanelPosition = 'right' | 'left' | 'bottom' | 'top';

type TogglePanelProps = {
  ariaControls: string;
  children: ReactNode;
  className?: string;
  panelPosition?: PanelPosition;
  preventClickOutside?: boolean;
  showCloseIcon?: boolean;
  triggerBtnClassName?: string;
  triggerBtnContent?: ReactNode;
};

const TogglePanel = ({
  children,
  ariaControls,
  panelPosition = 'right',
  className = '',
  triggerBtnClassName = 'menu-burger',
  triggerBtnContent,
  showCloseIcon,
  preventClickOutside = false,
}: TogglePanelProps) => {
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();
  const { isPanelShown, onTogglePanel, panelRef, onHidePanel } = useTogglePanel(
    { preventClickOutside },
  );

  useTrapFocus({ id: 'togglePanel', popupRef: panelRef });

  return (
    <>
      <Button
        className={triggerBtnClassName}
        variant={BtnVariant.Ghost}
        ariaExpanded={isPanelShown}
        onClick={onTogglePanel}
        ariaLabel={!isPanelShown ? language.showContent : language.hideContent}
        ariaHasPopup
        ariaControls={ariaControls}
      >
        {triggerBtnContent ? (
          triggerBtnContent
        ) : (
          <span className="menu-burger-item" aria-hidden={true} />
        )}
      </Button>
      <div
        ref={panelRef}
        className={`toggle-panel ${panelPosition} ${className} ${isPanelShown ? 'shown' : ''}`}
        id={ariaControls}
        aria-hidden={isPanelShown ? undefined : true}
      >
        {isPanelShown ? children : ''}
        {showCloseIcon && isPanelShown && <BtnClose onClick={onHidePanel} />}
      </div>
      {isPanelShown && !isMobileSize && <Overlay />}
    </>
  );
};

export default TogglePanel;
