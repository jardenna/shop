import { useId } from 'react';
import { Address } from '../../app/api/apiTypes/addressApiTypes';
import IconContent from '../../components/IconContent';
import DeleteModal from '../../components/Modal/DeleteModal';
import TriggerModalButton from '../../components/Modal/TriggerModalButton';
import { useToast } from '../../components/toast/hooks/useToast';
import { useLanguage } from '../../features/language/useLanguage';
import { useDeleteAddressMutation } from '../../features/profile/addressesApiSlice';
import { BtnVariant, IconName } from '../../types/enums';

interface DeleteAddressModalProps {
  selectedAddress: Address | null;
  onClick: () => void;
}

const DeleteAddressModal = ({
  selectedAddress,
  onClick,
}: DeleteAddressModalProps) => {
  const ariaControls = useId();
  const modalId = 'delete-address';
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
    <>
      <TriggerModalButton
        ariaControls={ariaControls}
        modalId={modalId}
        variant={BtnVariant.Ghost}
        onClick={onClick}
      >
        <IconContent
          iconName={IconName.Trash}
          ariaLabel={language.deleteAddress}
        />
      </TriggerModalButton>
      <DeleteModal
        isLoading={isLoading}
        modalId={modalId}
        headerText={language.deleteAddress}
        ariaControls={ariaControls}
        onDelete={handleDeleteAddress}
        modalMessage={selectedAddress?.street ?? ''}
        itemId={selectedAddress?.id ?? ''}
      />
    </>
  );
};

export default DeleteAddressModal;
