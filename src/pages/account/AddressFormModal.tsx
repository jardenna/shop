import type {
  Address,
  AddressInput,
} from '../../app/api/apiTypes/shopApiTypes';
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
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from '../../features/profile/profileApiSlice';
import useFormValidation from '../../hooks/useFormValidation';
import { BtnType, BtnVariant, IconName, SizeVariant } from '../../types/enums';
import handleApiError from '../../utils/handleApiError';
import { addressInputs } from './AddressPage';

type AddressFormModalProps = {
  id: string | null;
  username: string;
  address?: Address;
};

const AddressFormModal = ({ id, address, username }: AddressFormModalProps) => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();

  const initialState: AddressInput = {
    name: address?.name || username,
    street: address?.street ?? '',
    zipCode: address?.zipCode ?? '',
    city: address?.city ?? '',
    country: address?.country ?? 'Danmark',
    id: id || null,
  };

  const { values, onChange, onSubmit } = useFormValidation({
    initialState,
    callback: handleUpdateAddress,
  });

  const [updateAddress, { isLoading }] = useUpdateAddressMutation();
  const [addAddress, { isLoading: addAddressIsLoading }] =
    useAddAddressMutation();

  const updatedAddress = id ? { ...values, id } : { ...values };

  async function handleUpdateAddress() {
    try {
      if (id) {
        await updateAddress({
          address: updatedAddress,
        }).unwrap();
      } else {
        await addAddress({
          addresses: updatedAddress,
        }).unwrap();
      }

      onAddMessagePopup({
        message: id ? language.addressUpdated : language.addressCreated,
      });
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  }

  const primaryActionBtn: PrimaryActionBtnProps = {
    onSubmit,
    buttonType: BtnType.Submit,
    label: language.update,
    disabled: isLoading || addAddressIsLoading,
    showBtnLoader: isLoading || addAddressIsLoading,
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

export default AddressFormModal;
