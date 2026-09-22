import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import { usePopModal } from './usePopModal';

interface TriggerModalButtonProps {
  ariaControlsId: string;
  label: string;
  modalId: string;
  className?: string;
  disabled?: boolean;
  variant?: BtnVariant;
}

const TriggerModalButton = ({
  label,
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
      {label}
    </Button>
  );
};

export default TriggerModalButton;
