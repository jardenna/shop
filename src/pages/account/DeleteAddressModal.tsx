import IconContent from '../../components/IconContent';
import {
  PrimaryActionBtnProps,
  SecondaryActionBtnProps,
} from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, IconName } from '../../types/enums';

export type DeleteAddressModalProps = {
  id: string;
  modalMessage: string;
  onDeleteAddress: (id: string) => void;
};

const DeleteAddressModal = ({
  id,
  modalMessage,
  onDeleteAddress,
}: DeleteAddressModalProps) => {
  const { language } = useLanguage();
  const primaryActionBtn: PrimaryActionBtnProps = {
    onClick: () => {
      onDeleteAddress(id);
    },
    label: language.delete,
    variant: BtnVariant.Danger,
  };

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  return (
    <ModalContainer
      triggerModalBtnContent={
        <IconContent
          iconName={IconName.Trash}
          title=""
          ariaLabel={language.deleteAddress}
        />
      }
      triggerModalBtnVariant={BtnVariant.Ghost}
      id={`delete-${id}`}
      primaryActionBtn={primaryActionBtn}
      secondaryActionBtn={secondaryActionBtn}
      modalHeaderText={language.deleteAddress}
    >
      {language.sureToDelete} {modalMessage}
    </ModalContainer>
  );
};

export default DeleteAddressModal;
