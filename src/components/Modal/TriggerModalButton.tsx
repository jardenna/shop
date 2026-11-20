import { BtnVariant, type BtnVariantValue } from '../../types/enums';
import { RefBtnType } from '../../types/types';
import Button from '../Button';
import { BaseModalProps } from './Modal';
import { useModal } from './useModal';

interface TriggerModalButtonProps extends BaseModalProps {
  buttonRef?: RefBtnType;
  disabled?: boolean;
  variant?: BtnVariantValue;
  onClick?: () => void;
}

const TriggerModalButton = ({
  children,
  modalId,
  ariaControls,
  onClick,
  disabled,
  className = '',
  buttonRef,
  variant = BtnVariant.Primary,
}: TriggerModalButtonProps) => {
  const { openModal } = useModal();

  return (
    <Button
      className={className}
      disabled={disabled}
      ariaControls={ariaControls}
      ariaHasPopup="dialog"
      variant={variant}
      ref={buttonRef}
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
