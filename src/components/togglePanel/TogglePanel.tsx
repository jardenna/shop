import { ReactNode, RefObject, useId } from 'react';
import { BtnVariant } from '../../types/enums';
import type { AriaHasPopup } from '../../types/types';
import Button from '../Button';
import './_toggle-panel.scss';
import Panel from './Panel';

export interface BaseTogglePanelProps {
  children: ReactNode;
  isPanelShown: boolean;
  panelRef: RefObject<HTMLDivElement | null>;
  className?: string;
  onHidePanel?: () => void;
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
  className = '',
  triggerBtnContent,
  ariaHasPopup,
  panelRef,
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
      <Panel
        isPanelShown={isPanelShown}
        panelRef={panelRef}
        togglePanelId={togglePanelId}
        className={className}
        onHidePanel={onHidePanel}
      >
        {children}
      </Panel>
    </>
  );
};

export default TogglePanel;
