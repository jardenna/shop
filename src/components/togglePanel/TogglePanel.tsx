import { ReactNode, RefObject, useId } from 'react';
import { BtnVariant } from '../../types/enums';
import type { AriaHasPopup } from '../../types/types';
import Button from '../Button';
import './_toggle-panel.scss';
import Panel from './Panel';

type TogglePanelProps = {
  children: ReactNode;
  isPanelShown: boolean;
  panelRef: RefObject<HTMLDivElement | null>;
  triggerBtnContent: ReactNode;
  ariaHasPopup?: AriaHasPopup;
  ariaLabel?: string;
  btnVariant?: BtnVariant;
  className?: string;
  triggerBtnClassName?: string;
  onHidePanel?: () => void;
  onTogglePanel: () => void;
};

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
        ref={panelRef}
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
