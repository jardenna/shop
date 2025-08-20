import { ReactNode } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import BtnClose from '../BtnClose';
import Button from '../Button';
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
  const { isPanelShown, onTogglePanel, panelRef, onHidePanel } = useTogglePanel(
    { preventClickOutside },
  );

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
      >
        {children}

        {showCloseIcon && <BtnClose onClick={onHidePanel} />}
      </div>
    </>
  );
};

export default TogglePanel;
