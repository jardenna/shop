import { useLanguage } from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import Modal, { ModalProps } from './Modal';

import { usePopModal } from './usePopModal';

interface FormModalProps extends ModalProps {
  isLoading: boolean;
  disabled?: boolean;
  submitLabel?: string;
  onSubmit: () => void;
}

const FormModal = ({
  ariaControls,
  children,
  headerText,
  modalId,
  isLoading,
  onSubmit,
  modalSize = 'medium',
  className,
  submitLabel,
  disabled,
  onClearAllValues,
}: FormModalProps) => {
  const { language } = useLanguage();
  const { closeModal } = usePopModal();

  const handleClose = () => {
    onClearAllValues?.();
    closeModal();
  };

  return (
    <Modal
      modalId={modalId}
      headerText={headerText}
      modalSize={modalSize}
      ariaControls={ariaControls}
      className={className}
      onClearAllValues={onClearAllValues}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        {children}

        <footer className="footer">
          <Button onClick={handleClose} variant={BtnVariant.Secondary}>
            {language.cancel}
          </Button>
          <Button showBtnLoader={isLoading} type="submit" disabled={disabled}>
            {submitLabel ?? language.update}
          </Button>
        </footer>
      </form>
    </Modal>
  );
};

export default FormModal;
