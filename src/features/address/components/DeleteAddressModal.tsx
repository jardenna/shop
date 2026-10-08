import { useId } from 'react';
import { Address } from '../../../app/api/apiTypes/addressApiTypes';
import IconContent from '../../../components/IconContent';
import DeleteModal from '../../../components/Modal/DeleteModal';
import TriggerModalButton from '../../../components/Modal/TriggerModalButton';
import { useToast } from '../../../components/toast/hooks/useToast';
import { BtnVariant, IconName } from '../../../types/enums';
import { useLanguage } from '../../language/useLanguage';
import { useDeleteAddressMutation } from '../addressesApiSlice';

interface DeleteAddressModalProps {
  address: Address;
}

const DeleteAddressModal = ({ address }: DeleteAddressModalProps) => {
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
        modalMessage={address.street}
        itemId={address.id}
      />
    </>
  );
};

export default DeleteAddressModal;
