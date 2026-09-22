import { useLanguage } from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import PopModal from './PopModal';

interface DeleteModalProps {
  ariaControlsId: string;
  headerText: string;
  modalId: string;
  closeModal: () => void;
}

const DeleteModal = ({
  modalId,
  closeModal,
  ariaControlsId,
  headerText,
}: DeleteModalProps) => {
  const { language } = useLanguage();

  return (
    <PopModal
      modalId={modalId}
      headerText={headerText}
      ariaControls={ariaControlsId}
    >
      {language.sureToDelete}
      <footer className="footer">
        <Button
          type="button"
          onClick={closeModal}
          variant={BtnVariant.Secondary}
        >
          {language.cancel}
        </Button>
        <Button type="button" onClick={closeModal} variant={BtnVariant.Danger}>
          {language.delete}
        </Button>
      </footer>
    </PopModal>
  );
};

export default DeleteModal;
