import IconContent from '../../components/IconContent';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import { PrimaryActionBtnProps } from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
import useLanguage from '../../features/language/useLanguage';
import { useDeleteAddressMutation } from '../../features/profile/profileApiSlice';
import { BtnVariant, IconName } from '../../types/enums';
import handleApiError from '../../utils/handleApiError';

export type DeleteAddressModalProps = {
  id: string;
  modalMessage: string;
};

const DeleteAddressModal = ({ id, modalMessage }: DeleteAddressModalProps) => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const [deleteAddress, { reset }] = useDeleteAddressMutation();

  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteAddress({
        address: id,
      }).unwrap();
      onAddMessagePopup({
        message: language.addressDeleted,
      });
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  };
  const primaryActionBtn: PrimaryActionBtnProps = {
    onClick: () => {
      handleDeleteAddress(id);
    },
    label: language.delete,
    variant: BtnVariant.Danger,
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
