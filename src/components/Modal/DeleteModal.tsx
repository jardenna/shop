import { useLanguage } from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import PopModal from './Modal';
import { useModal } from './useModal';

export interface BaseDeleteModalProps {
  ariaControls: string;
  itemId: string;
  modalId: string;
  modalMessage: string;
}

export interface DeleteModalProps extends BaseDeleteModalProps {
  headerText: string;
  isLoading: boolean;
  onDelete: (id: string) => void;
}

const DeleteModal = ({
  modalId,
  ariaControls,
  headerText,
  onDelete,
  modalMessage,
  isLoading,
  itemId,
}: DeleteModalProps) => {
  const { language } = useLanguage();
  const { closeModal } = useModal();

  const handleDeleteItem = () => {
    onDelete(itemId);
    closeModal();
  };

  return (
    <PopModal
      modalId={modalId}
      headerText={headerText}
      ariaControls={ariaControls}
    >
      {language.sureToDelete} {modalMessage}
      <footer className="footer">
        <Button onClick={closeModal} variant={BtnVariant.Secondary}>
          {language.cancel}
        </Button>
        <Button
          showBtnLoader={isLoading}
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
