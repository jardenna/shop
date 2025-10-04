import IconContent from '../../components/IconContent';
import {
  PrimaryActionBtnProps,
  SecondaryActionBtnProps,
} from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, IconName } from '../../types/enums';

export type UpdateAddressModalProps = {
  id: string;
  modalMessage: string;
  onUpdateAddress: (id: string) => void;
};

const UpdateAddressModal = ({
  id,
  modalMessage,
  onUpdateAddress,
}: UpdateAddressModalProps) => {
  const { language } = useLanguage();
  const primaryActionBtn: PrimaryActionBtnProps = {
    onClick: () => {
      onUpdateAddress(id);
    },
    label: language.update,
  };

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  return (
    <ModalContainer
      triggerModalBtnContent={
        <IconContent
          iconName={IconName.Pencil}
          title=""
          ariaLabel={language.updateAddress}
        />
      }
      triggerModalBtnVariant={BtnVariant.Ghost}
      id={`update-${id}`}
      primaryActionBtn={primaryActionBtn}
      secondaryActionBtn={secondaryActionBtn}
      modalHeaderText={language.updateAddress}
    >
      {language.sureToDelete} {modalMessage}
    </ModalContainer>
  );
};

export default UpdateAddressModal;
