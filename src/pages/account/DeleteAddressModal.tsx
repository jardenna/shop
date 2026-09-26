import DeleteModal, {
  BaseDeleteModalProps,
} from '../../components/Modal/DeleteModal';
import { useToast } from '../../components/toast/hooks/useToast';
import { useLanguage } from '../../features/language/useLanguage';
import { useDeleteAddressMutation } from '../../features/profile/addressesApiSlice';

const DeleteAddressModal = ({
  itemId,
  modalMessage,
  modalId,
  ariaControls,
}: BaseDeleteModalProps) => {
  const { language } = useLanguage();
  const { onAddToast } = useToast();
  const [deleteAddress, { isLoading }] = useDeleteAddressMutation();

  const handleDeleteAddress = async (id: string) => {
    await deleteAddress(id).unwrap();
    onAddToast({
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
