import { FC, ReactNode } from 'react';
import { ActionBtnProps } from '../../layout/nav/Nav';
import { BtnVariant } from '../../types/enums';
import './_dropdown.scss';
import DropdownTrigger from './AdaptivePanelTrigger';
import Dropdown from './Dropdown';
import Panel, { Variant } from './Panel';
import usePanel from './useAdaptivePanel';

interface AdaptivePanelProps {
  actionBtn: ActionBtnProps;
  children: ReactNode;
  btnVariant?: BtnVariant;
  isPanel?: boolean;
  panelVariant?: Variant;
  triggerContent?: ReactNode;
}

const AdaptivePanel: FC<AdaptivePanelProps> = ({
  actionBtn,
  children,
  btnVariant = BtnVariant.Ghost,
  triggerContent,
  isPanel,
  panelVariant,
}) => {
  const { isPanelHidden, onTogglePanel, onHidePanel, panelRef } = usePanel();
  const id = !isPanel ? 'dropdown' : 'panel';

  const handleCallback = () => {
    if (actionBtn.onClick) {
      actionBtn.onClick();
    }
    onHidePanel();
  };

  return (
    <div className={`${id}-container`} ref={panelRef}>
      <DropdownTrigger
        btnVariant={btnVariant}
        onClick={onTogglePanel}
        className={actionBtn.className || ''}
        ariaExpanded={!isPanelHidden}
        ariaControls={id}
        ariaLabel={actionBtn.ariaLabel}
      >
        {triggerContent}
      </DropdownTrigger>

      {!isPanelHidden && !isPanel && (
        <Dropdown
          id={id}
          handleCallback={handleCallback}
          btnLabel={actionBtn.label ?? ''}
        >
          {children}
        </Dropdown>
      )}

      {isPanel && (
        <Panel id={id} isPanelHidden={isPanelHidden} variant={panelVariant}>
          {children}
        </Panel>
      )}
    </div>
  );
};

export default AdaptivePanel;
