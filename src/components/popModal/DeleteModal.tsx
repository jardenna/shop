import { useLanguage } from '../../features/language/useLanguage';
import { DeleteAddressModalProps } from '../../pages/account/DeleteAddressModal';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import PopModal from './PopModal';
import { usePopModal } from './usePopModal';

interface DeleteModalProps extends DeleteAddressModalProps {
  ariaControls: string;
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
  const { closeModal } = usePopModal();

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
