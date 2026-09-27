import { ReactNode, useId } from 'react';
import PanelPopup from '../../features/cart/components/miniCartPopup/PanelPopup';
import { BtnVariant } from '../../types/enums';
import type { AriaHasPopup } from '../../types/types';
import Button from '../Button';
import './_toggle-panel.scss';

export interface BaseTogglePanelProps {
  children: ReactNode;
  isPanelShown: boolean;
  onHidePanel: () => void;
}

interface TogglePanelProps extends BaseTogglePanelProps {
  triggerBtnContent: ReactNode;
  ariaHasPopup?: AriaHasPopup;
  ariaLabel?: string;
  btnVariant?: BtnVariant;
  triggerBtnClassName?: string;
  onTogglePanel: () => void;
}

const TogglePanel = ({
  children,
  ariaLabel,
  triggerBtnClassName,
  onTogglePanel,
  isPanelShown,
  btnVariant = BtnVariant.Ghost,
  triggerBtnContent,
  ariaHasPopup,
  onHidePanel,
}: TogglePanelProps) => {
  const togglePanelId = useId();
  return (
    <>
      <Button
        variant={btnVariant}
        ariaExpanded={isPanelShown}
        onClick={onTogglePanel}
        ariaLabel={ariaLabel}
        ariaHasPopup={ariaHasPopup}
        ariaControls={togglePanelId}
        className={triggerBtnClassName}
      >
        {triggerBtnContent}
      </Button>
      <PanelPopup isOpen={isPanelShown} onClosePanel={onHidePanel}>
        {children}
      </PanelPopup>
    </>
  );
};

export default TogglePanel;
