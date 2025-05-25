import { ReactNode } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import './_toggle-panel.scss';
import useTogglePanel from './useTogglePanel';

type PanelPosition = 'right' | 'left' | 'bottom' | 'top';

type TogglePanelProps = {
  ariaControls: string;
  children: ReactNode;
  panelPosition?: PanelPosition;
};

const TogglePanel = ({
  children,
  ariaControls,
  panelPosition = 'left',
}: TogglePanelProps) => {
  const { language } = useLanguage();
  const { isPanelShown, onTogglePanel, panelRef } = useTogglePanel();

  return (
    <>
      <Button
        className="menu-burger"
        variant={BtnVariant.Ghost}
        ariaExpanded={isPanelShown}
        onClick={onTogglePanel}
        ariaLabel={!isPanelShown ? language.showContent : language.hideContent}
        ariaHasPopup
        ariaControls={ariaControls}
      >
        <span className="menu-burger-item" aria-hidden={true} />
      </Button>
      <div
        ref={panelRef}
        className={`toggle-panel ${panelPosition} ${isPanelShown ? 'shown' : ''}`}
        id={ariaControls}
      >
        {children}
      </div>
    </>
  );
};

export default TogglePanel;
