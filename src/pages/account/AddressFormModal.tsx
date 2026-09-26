import { useId } from 'react';
import {
  Address,
  AddressFields,
  AddressInput,
  StandardAddress,
} from '../../app/api/apiTypes/addressApiTypes';
import FieldSet from '../../components/fieldset/FieldSet';
import CheckboxList from '../../components/formElements/checkbox/CheckboxList';
import Input from '../../components/formElements/Input';
import IconContent from '../../components/IconContent';
import FormModal from '../../components/Modal/FormModal';
import TriggerModalButton from '../../components/Modal/TriggerModalButton';
import { useModal } from '../../components/Modal/useModal';
import { useToast } from '../../components/toast/hooks/useToast';
import { useLanguage } from '../../features/language/useLanguage';
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from '../../features/profile/addressesApiSlice';
import { useFormValidation } from '../../hooks/useFormValidation';
import { BtnVariant, IconName } from '../../types/enums';
import type { InputType, RefBtnType } from '../../types/types';
import { handleApiError } from '../../utils/handleApiError';
import { validateAddress } from '../../utils/validation/validateAddress';

interface AddressFormModalProps {
  headerText: string;
  id: string | null;
  popupMessage: string;
  submitLabel: string;
  username: string;
  address?: Address;
  buttonRef?: RefBtnType;
  disabled?: boolean;
}

type AddressField = keyof AddressFields;

type AddressFieldListProps = {
  name: AddressField;
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
  headerText,
  submitLabel,
  popupMessage,
  disabled,
  buttonRef,
}: AddressFormModalProps) => {
  const ariaControls = useId();
  const modalId = id ? `update-${id}` : 'create';
  const { language } = useLanguage();
  const { onAddToast } = useToast();
  const { closeModal } = useModal();

  const standardAddressList: StandardAddress[] = [
    'addressBilling',
    'addressDelivery',
  ];

  const initialState: AddressInput = {
    name: address?.name || username,
    street: address?.street ?? '',
    zipCode: address?.zipCode ?? '',
    city: address?.city ?? '',
    country: address?.country ?? 'Danmark',
    standardAddress: address?.standardAddress ?? [],
    id: id || null,
  };

  const { values, onChange, onSubmit, errors, isFormDirty, onClearAllValues } =
    useFormValidation({
      initialState,
      callback: handleSubmitAddress,
      validate: validateAddress,
    });

  const [updateAddress, { isLoading }] = useUpdateAddressMutation();
  const [addAddress, { isLoading: addIsLoading }] = useAddAddressMutation();

  const updatedAddress = id ? { ...values, id } : values;

  async function handleSubmitAddress() {
    if (!isFormDirty) {
      onAddToast({
        message: language.noChanges,
      });
      return;
    }

    try {
      if (id) {
        await updateAddress({ address: updatedAddress, id }).unwrap();
      } else {
        await addAddress({ address: updatedAddress }).unwrap();
      }

      onAddToast({
        message: popupMessage,
      });

      closeModal();
    } catch (error) {
      handleApiError(error, onAddToast);
    }
  }

  return (
    <>
      <TriggerModalButton
        modalId={modalId}
        ariaControls={ariaControls}
        variant={BtnVariant.Ghost}
        disabled={disabled}
        buttonRef={buttonRef}
      >
        {id ? (
          <IconContent
            iconName={IconName.Pencil}
            ariaLabel={language.updateAddress}
          />
        ) : (
          <IconContent
            iconName={IconName.Add}
            ariaLabel={language.createNewAddress}
            showLabel
          />
        )}
      </TriggerModalButton>

      <FormModal
        modalId={modalId}
        ariaControls={ariaControls}
        headerText={headerText}
        modalSize="medium"
        isLoading={isLoading || addIsLoading}
        onSubmit={onSubmit}
        disabled={!!id && !isFormDirty}
        submitLabel={submitLabel}
        className="address-modal"
        onClearAllValues={onClearAllValues}
      >
        <FieldSet legendText={language.address}>
          <div className="address-form">
            {addressInputList.map(({ name, required, type }) => (
              <Input
                key={name}
                onChange={onChange}
                required={required}
                name={name}
                id={name}
                value={values[name]}
                labelText={language[name]}
                type={type}
                errorText={language[errors[name]]}
              />
            ))}

            <CheckboxList
              checkBoxList={standardAddressList}
              name="standardAddress"
              onChange={onChange}
              values={values.standardAddress}
              language={language}
            />
          </div>
        </FieldSet>
      </FormModal>
    </>
  );
};

export default AddressFormModal;
