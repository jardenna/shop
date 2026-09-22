import { useLanguage } from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import PopModal from './PopModal';
import { usePopModal } from './usePopModal';

interface DeleteModalProps {
  ariaControlsId: string;
  headerText: string;
  id: string;
  isLoading: boolean;
  modalId: string;
  modalMessage: string;
  onDelete: (id: string) => void;
}

const DeleteModal = ({
  modalId,
  ariaControlsId,
  headerText,
  onDelete,
  modalMessage,
  isLoading,
  id,
}: DeleteModalProps) => {
  const { language } = useLanguage();
  const { closeModal } = usePopModal();

  const handleDeleteItem = () => {
    onDelete(id);
    closeModal();
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
