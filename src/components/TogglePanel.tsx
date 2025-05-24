import { ReactNode } from 'react';

import useTogglePanel from '../hooks/useTogglePanel';
import { BtnVariant } from '../types/enums';
import Button from './Button';

export type TogglePanelProps = {
  ariaControls: string;
  ariaLabel: string;
  children: ReactNode;
};
const TogglePanel = ({
  ariaLabel,
  children,
  ariaControls,
}: TogglePanelProps) => {
  const { isPanelShown, onTogglePanel, panelRef } = useTogglePanel();
  return (
    <>
      <Button
        className="menu-burger"
        variant={BtnVariant.Ghost}
        ariaExpanded={isPanelShown}
        onClick={onTogglePanel}
        ariaLabel={ariaLabel}
        ariaHasPopup
        ariaControls={ariaControls}
      >
        <span className="menu-burger-item" aria-hidden={true} />
      </Button>
      <div
        ref={panelRef}
        className={`toggle-panel ${isPanelShown ? 'shown' : ''}`}
        id={ariaControls}
      >
        {children}
      </div>
    </>
  );
};

export default TogglePanel;
