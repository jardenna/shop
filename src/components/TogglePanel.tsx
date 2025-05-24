import { ReactNode } from 'react';

import useLanguage from '../features/language/useLanguage';
import useTogglePanel from '../hooks/useTogglePanel';
import { BtnVariant } from '../types/enums';
import Button from './Button';

export type TogglePanelProps = {
  ariaControls: string;
  children: ReactNode;
};
const TogglePanel = ({ children, ariaControls }: TogglePanelProps) => {
  const { language } = useLanguage();
  const { isPanelShown, onTogglePanel, panelRef } = useTogglePanel();

  //  {isOpen ? 'Skjul indhold' : 'Vis indhold'}
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
        className={`toggle-panel ${isPanelShown ? 'shown' : ''}`}
        id={ariaControls}
      >
        {children}
      </div>
    </>
  );
};

export default TogglePanel;
