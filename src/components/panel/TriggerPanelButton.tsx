import type { ReactElement } from 'react';
import { type BtnVariantValue } from '../../types/constants';
import Button from '../Button';

interface TriggerPanelButtonProps {
  ariaControls: string;
  ariaExpanded: boolean;
  ariaLabel: string;
  children: ReactElement;
  className?: string;
  variant?: BtnVariantValue;
  onTogglePanel: () => void;
}

const TriggerPanelButton = ({
  ariaControls,
  ariaExpanded,
  ariaLabel,
  onTogglePanel,
  children,
  className,
  variant = 'ghost',
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
