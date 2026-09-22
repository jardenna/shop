import { ReactNode } from 'react';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import { usePopModal } from './usePopModal';

interface TriggerModalButtonProps {
  ariaControlsId: string;
  children: ReactNode;
  modalId: string;
  className?: string;
  disabled?: boolean;
  variant?: BtnVariant;
}

const TriggerModalButton = ({
  children,
  modalId,
  ariaControlsId,
  disabled,
  className = '',
  variant = BtnVariant.Primary,
}: TriggerModalButtonProps) => {
  const { openModal } = usePopModal();
  return (
    <Button
      className={className}
      disabled={disabled}
      ariaControls={ariaControlsId}
      ariaHasPopup="dialog"
      variant={variant}
      onClick={() => {
        openModal(modalId);
      }}
    >
      {children}
    </Button>
  );
};

export default TriggerModalButton;
