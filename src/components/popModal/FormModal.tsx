import { useLanguage } from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import PopModal, { PopModalProps } from './PopModal';
import { usePopModal } from './usePopModal';

interface FormModalProps extends PopModalProps {
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
  onClose,
}: FormModalProps) => {
  const { language } = useLanguage();
  const { closeModal } = usePopModal();

  const handleClose = () => {
    onClose?.();
    closeModal();
  };

  return (
    <PopModal
      modalId={modalId}
      headerText={headerText}
      modalSize={modalSize}
      ariaControls={ariaControls}
      className={className}
      onClose={onClose}
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
    </PopModal>
  );
};

export default FormModal;
