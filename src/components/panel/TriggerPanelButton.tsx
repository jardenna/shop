import { ReactNode } from 'react';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';

interface TriggerPanelButtonProps {
  ariaControls: string;
  ariaExpanded: boolean;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  variant?: BtnVariant;
  onTogglePanel: () => void;
}

const TriggerPanelButton = ({
  ariaControls,
  ariaExpanded,
  ariaLabel,
  onTogglePanel,
  children,
  className,
  variant = BtnVariant.Ghost,
}: TriggerPanelButtonProps) => (
  <Button
    ariaExpanded={ariaExpanded}
    onClick={onTogglePanel}
    ariaLabel={ariaLabel}
    ariaHasPopup
    ariaControls={ariaControls}
    className={className}
    variant={variant}
  >
    {children}
  </Button>
);

export default TriggerPanelButton;
