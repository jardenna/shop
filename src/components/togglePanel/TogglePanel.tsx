import { ReactNode, RefObject, useId } from 'react';
import { BtnVariant } from '../../types/enums';
import type { AriaHasPopup } from '../../types/types';
import BtnClose from '../BtnClose';
import Button from '../Button';
import './_toggle-panel.scss';

type TogglePanelProps = {
  children: ReactNode;
  isPanelShown: boolean;
  panelRef: RefObject<HTMLDivElement | null>;
  triggerBtnContent: ReactNode;
  ariaHasPopup?: AriaHasPopup;
  ariaLabel?: string;
  btnVariant?: BtnVariant;
  className?: string;
  hideCloseBtn?: boolean;
  onHidePanel: () => void;
  onTogglePanel: () => void;
};

const TogglePanel = ({
  children,
  ariaLabel,
  onTogglePanel,
  isPanelShown,
  btnVariant = BtnVariant.Ghost,
  className = '',
  triggerBtnContent,
  ariaHasPopup,
  panelRef,
  onHidePanel,
  hideCloseBtn,
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
      >
        {triggerBtnContent}
      </Button>
      <div
        ref={panelRef}
        className={`toggle-panel ${className} ${isPanelShown ? 'shown' : ''}`}
        id={togglePanelId}
        aria-hidden={isPanelShown ? undefined : true}
      >
        {!hideCloseBtn && <BtnClose onClick={onHidePanel} />}
        {children}
      </div>
    </>
  );
};
export default TogglePanel;
