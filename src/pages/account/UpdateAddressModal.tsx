import type { Address } from '../../app/api/apiTypes/shopApiTypes';
import FieldSet from '../../components/fieldset/FieldSet';
import Input from '../../components/formElements/Input';
import IconContent from '../../components/IconContent';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import {
  PrimaryActionBtnProps,
  SecondaryActionBtnProps,
} from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
import useLanguage from '../../features/language/useLanguage';
import { useUpdateAddressMutation } from '../../features/profile/profileApiSlice';
import useFormValidation from '../../hooks/useFormValidation';
import { BtnType, BtnVariant, IconName, SizeVariant } from '../../types/enums';
import handleApiError from '../../utils/handleApiError';
import { addressInputs } from './AddressPage';

type UpdateAddressModalProps = {
  address: Address;
  id: string;
  username: string;
};

const UpdateAddressModal = ({
  id,
  address,
  username,
}: UpdateAddressModalProps) => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();

  const initialState: Address = {
    name: address.name || username,
    street: address.street,
    zipCode: address.zipCode,
    city: address.city,
    country: address.country,
    id,
  };

  const { values, onChange, onSubmit } = useFormValidation({
    initialState,
    callback: handleUpdateAddress,
  });

  const [updateAddress, { isLoading }] = useUpdateAddressMutation();

  const updatedAddress = { ...values, id };

  async function handleUpdateAddress() {
    try {
      await updateAddress({
        addresses: updatedAddress,
      }).unwrap();
      onAddMessagePopup({
        message: language.addressUpdated,
      });
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  }

  const primaryActionBtn: PrimaryActionBtnProps = {
    onSubmit,
    buttonType: BtnType.Submit,
    label: language.update,
    disabled: isLoading,
  };

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  return (
    <ModalContainer
      modalSize={SizeVariant.Md}
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
      className="address-modal"
    >
      <FieldSet legendText={language.address} hideLegendText>
        {addressInputs.map((input) => (
          <Input
            key={input}
            onChange={onChange}
            name={input}
            id={input}
            value={values[input] ?? ''}
            labelText={language[input]}
          />
        ))}
      </FieldSet>
    </ModalContainer>
  );
};

export default UpdateAddressModal;
