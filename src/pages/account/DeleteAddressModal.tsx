import { useMessagePopup } from '../../components/messagePopup/useMessagePopup';
import DeleteModal from '../../components/popModal/DeleteModal';
import { useLanguage } from '../../features/language/useLanguage';
import { useDeleteAddressMutation } from '../../features/profile/addressesApiSlice';

export interface DeleteAddressModalProps {
  ariaControls: string;
  itemId: string;
  modalId: string;
  modalMessage: string;
}

const DeleteAddressModal = ({
  itemId,
  modalMessage,
  modalId,
  ariaControls,
}: DeleteAddressModalProps) => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const [deleteAddress, { isLoading }] = useDeleteAddressMutation();

  const handleDeleteAddress = async (id: string) => {
    await deleteAddress(id).unwrap();
    onAddMessagePopup({
      message: language.addressDeleted,
    });
  };

  return (
    <DeleteModal
      isLoading={isLoading}
      modalId={modalId}
      headerText={language.deleteAddress}
      ariaControls={ariaControls}
      onDelete={handleDeleteAddress}
      modalMessage={modalMessage}
      itemId={itemId}
    />
  );
};

export default DeleteAddressModal;
