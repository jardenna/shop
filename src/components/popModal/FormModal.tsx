import { useLanguage } from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import PopModal, { PopModalProps } from './PopModal';
import { usePopModal } from './usePopModal';

interface FormModalProps extends PopModalProps {
  id: string;
  isLoading: boolean;
  submitLabel?: string;
  onSubmit: () => void;
}

const FormModal = ({
  id,
  ariaControls,
  children,
  headerText,
  modalId,
  isLoading,
  onSubmit,
  modalSize = 'medium',
  className,
  submitLabel,
}: FormModalProps) => {
  const { language } = useLanguage();
  const { closeModal } = usePopModal();

  console.log(id);

  return (
    <PopModal
      modalId={modalId}
      headerText={headerText}
      modalSize={modalSize}
      ariaControls={ariaControls}
      className={className}
    >
      <form onSubmit={onSubmit}>
        {children}

        <footer className="footer">
          <Button onClick={closeModal} variant={BtnVariant.Secondary}>
            {language.cancel}
          </Button>
          <Button showBtnLoader={isLoading} type="submit">
            {submitLabel ?? language.update}
          </Button>
        </footer>
      </form>
    </PopModal>
  );
};

export default FormModal;
