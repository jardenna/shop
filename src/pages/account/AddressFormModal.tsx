import { useMemo } from 'react';
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
import useSubmitStatus from '../../components/modal/useSubmitStatus';
import useLanguage from '../../features/language/useLanguage';
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from '../../features/profile/profileApiSlice';
import useFormValidation from '../../hooks/useFormValidation';
import { BtnType, BtnVariant, IconName, SizeVariant } from '../../types/enums';
import type { InputType } from '../../types/types';
import handleApiError from '../../utils/handleApiError';
import validateAddress from '../../utils/validation/validateAddress';

type AddressFormModalProps = {
  id: string | null;
  modalHeaderText: string;
  popupMessage: string;
  primaryActionBtnLabel: string;
  username: string;
  address?: Address;
  triggerModalDisabled?: boolean;
};

type AddressFieldListProps = {
  name: keyof Address;
  required?: boolean;
  type?: InputType;
};

const addressInputList: AddressFieldListProps[] = [
  { name: 'name' },
  { name: 'street', required: true },
  { name: 'zipCode', required: true, type: 'number' },
  { name: 'city', required: true },
  { name: 'country' },
];

const AddressFormModal = ({
  id,
  address,
  username,
  modalHeaderText,
  primaryActionBtnLabel,
  popupMessage,
  triggerModalDisabled,
}: AddressFormModalProps) => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const { resultSuccess, setResultSuccess } = useSubmitStatus();

  const initialState: AddressInput = {
    name: address?.name || username,
    street: address?.street ?? '',
    zipCode: address?.zipCode ?? '',
    city: address?.city ?? '',
    country: address?.country ?? 'Danmark',
    id: id || null,
  };

  const { values, onChange, onSubmit, errors, onClearAllValues } =
    useFormValidation({
      initialState,
      callback: handleSubmitAddress,
      validate: validateAddress,
    });

  const [updateAddress, { isLoading, reset }] = useUpdateAddressMutation();
  const [addAddress, { isLoading: addIsLoading, reset: addReset }] =
    useAddAddressMutation();

  const updatedAddress = id ? { ...values, id } : { ...values };

  async function handleSubmitAddress() {
    try {
      if (id) {
        await updateAddress({ address: updatedAddress }).unwrap();
      } else {
        await addAddress({ address: updatedAddress }).unwrap();
      }

      onAddMessagePopup({ message: popupMessage });
      setResultSuccess(true);
      onClearAllValues();
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
      setResultSuccess(false);
    }
  }

  const primaryActionBtn = useMemo<PrimaryActionBtnProps>(
    () => ({
      onSubmit,
      buttonType: BtnType.Submit,
      label: primaryActionBtnLabel,
      disabled: isLoading || addIsLoading,
      showBtnLoader: isLoading || addIsLoading,
      resultSuccess,
    }),
    [onSubmit, primaryActionBtnLabel, isLoading, addIsLoading, resultSuccess],
  );

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  return (
    <ModalContainer
      triggerModalDisabled={triggerModalDisabled}
      onClearAllValues={onClearAllValues}
      onBoundaryReset={id ? reset : addReset}
      modalSize={SizeVariant.Md}
      triggerModalBtnContent={
        id ? (
          <IconContent
            iconName={IconName.Pencil}
            title=""
            ariaLabel={language.updateAddress}
          />
        ) : (
          <IconContent
            iconName={IconName.Add}
            title=""
            ariaLabel={language.createNewAddress}
            showLabel
          />
        )
      }
      triggerModalBtnVariant={BtnVariant.Ghost}
      id={id ? `update-${id}` : 'create'}
      primaryActionBtn={primaryActionBtn}
      secondaryActionBtn={secondaryActionBtn}
      modalHeaderText={modalHeaderText}
      className="address-modal"
    >
      <FieldSet legendText={language.address}>
        {addressInputList.map(({ name, required, type }) => (
          <Input
            key={name}
            onChange={onChange}
            required={required}
            name={name}
            id={name}
            value={values[name] ?? ''}
            labelText={language[name]}
            type={type}
            errorText={language[errors[name]]}
          />
        ))}
      </FieldSet>
    </ModalContainer>
  );
};

export default AddressFormModal;
