import { ReactNode } from 'react';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import { usePopModal } from './usePopModal';

interface TriggerModalButtonProps {
  ariaControls: string;
  children: ReactNode;
  modalId: string;
  className?: string;
  disabled?: boolean;
  variant?: BtnVariant;
  onClick?: () => void;
}

const TriggerModalButton = ({
  children,
  modalId,
  ariaControls,
  onClick,
  disabled,
  className = '',
  variant = BtnVariant.Primary,
}: TriggerModalButtonProps) => {
  const { openModal } = usePopModal();

  return (
    <Button
      className={className}
      disabled={disabled}
      ariaControls={ariaControls}
      ariaHasPopup="dialog"
      variant={variant}
      onClick={() => {
        openModal(modalId);
        onClick?.();
      }}
    >
      {children}
    </Button>
  );
};

export default TriggerModalButton;
