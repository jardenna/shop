import { useId } from 'react';
import { useMessagePopup } from '../../components/messagePopup/useMessagePopup';
import DeleteModal from '../../components/popModal/DeleteModal';
import { useLanguage } from '../../features/language/useLanguage';
import { useDeleteAddressMutation } from '../../features/profile/addressesApiSlice';

interface DeleteAddressModalProps {
  id: string;
  modalId: string;
  modalMessage: string;
}

const DeleteAddressModal = ({
  id,
  modalMessage,
  modalId,
}: DeleteAddressModalProps) => {
  const ariaControlsId = useId();
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
      ariaControlsId={ariaControlsId}
      onDelete={handleDeleteAddress}
      modalMessage={modalMessage}
      id={id}
    />
  );
};

export default DeleteAddressModal;
