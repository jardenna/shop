import { useLanguage } from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import PopModal from './PopModal';

interface DeleteModalProps {
  ariaControlsId: string;
  headerText: string;
  id: string;
  isLoading: boolean;
  modalId: string;
  modalMessage: string;
  closeModal: () => void;
  onDelete: (id: string) => void;
}

const DeleteModal = ({
  modalId,
  closeModal,
  ariaControlsId,
  headerText,
  onDelete,
  modalMessage,
  isLoading,
  id,
}: DeleteModalProps) => {
  const { language } = useLanguage();

  const handleDeleteItem = () => {
    onDelete(id);
  };

  return (
    <PopModal
      modalId={modalId}
      headerText={headerText}
      ariaControls={ariaControlsId}
    >
      {language.sureToDelete} {modalMessage}
      <footer className="footer">
        <Button
          type="button"
          onClick={closeModal}
          variant={BtnVariant.Secondary}
        >
          {language.cancel}
        </Button>
        <Button
          showBtnLoader={isLoading}
          type="button"
          onClick={handleDeleteItem}
          variant={BtnVariant.Danger}
        >
          {language.delete}
        </Button>
      </footer>
    </PopModal>
  );
};

export default DeleteModal;
