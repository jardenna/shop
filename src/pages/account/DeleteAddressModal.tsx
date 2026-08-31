import IconContent from '../../components/IconContent';
import { useMessagePopup } from '../../components/messagePopup/useMessagePopup';
import type { PrimaryActionBtnProps } from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
import { useLanguage } from '../../features/language/useLanguage';
import { useDeleteAddressMutation } from '../../features/profile/addressesApiSlice';
import { BtnVariant, IconName } from '../../types/enums';

export type DeleteAddressModalProps = {
  id: string;
  modalMessage: string;
};

const DeleteAddressModal = ({ id, modalMessage }: DeleteAddressModalProps) => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const [deleteAddress, { reset, isLoading }] = useDeleteAddressMutation();

  const handleDeleteAddress = async (id: string) => {
    await deleteAddress(id).unwrap();
    onAddMessagePopup({
      message: language.addressDeleted,
    });
  };
  const primaryActionBtn: PrimaryActionBtnProps = {
    onClick: () => {
      handleDeleteAddress(id);
    },
    label: language.delete,
    variant: BtnVariant.Danger,
    showBtnLoader: isLoading,
  };

  return (
    <ModalContainer
      onBoundaryReset={reset}
      triggerModalBtnContent={
        <IconContent
          iconName={IconName.Trash}
          ariaLabel={language.deleteAddress}
        />
      }
      triggerModalBtnVariant={BtnVariant.Ghost}
      id={`delete-${id}`}
      primaryActionBtn={primaryActionBtn}
      modalHeaderText={language.deleteAddress}
    >
      {language.sureToDelete} {modalMessage}
    </ModalContainer>
  );
};

export default DeleteAddressModal;
