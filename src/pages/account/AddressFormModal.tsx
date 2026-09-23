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
import { useMessagePopup } from '../../components/messagePopup/useMessagePopup';
import FormModal from '../../components/popModal/FormModal';
import TriggerModalButton from '../../components/popModal/TriggerModalButton';
import { usePopModal } from '../../components/popModal/usePopModal';
import { useLanguage } from '../../features/language/useLanguage';
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from '../../features/profile/addressesApiSlice';
import { useFormValidation } from '../../hooks/useFormValidation';
import { BtnVariant, IconName } from '../../types/enums';
import type { InputType } from '../../types/types';
import { handleApiError } from '../../utils/handleApiError';
import { validateAddress } from '../../utils/validation/validateAddress';

type AddressFormModalProps = {
  id: string | null;
  modalHeaderText: string;
  popupMessage: string;
  primaryActionBtnLabel: string;
  username: string;
  address?: Address;
  triggerModalClassName?: string;
  triggerModalDisabled?: boolean;
};

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
  modalHeaderText,
  primaryActionBtnLabel,
  popupMessage,
  triggerModalDisabled,
  triggerModalClassName,
}: AddressFormModalProps) => {
  const ariaControls = useId();
  const modalId = id ? `update-${id}` : 'create';
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const { closeModal } = usePopModal();

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

  const { values, onChange, onSubmit, errors, isFormDirty } = useFormValidation(
    {
      initialState,
      callback: handleSubmitAddress,
      validate: validateAddress,
    },
  );

  const [updateAddress, { isLoading }] = useUpdateAddressMutation();
  const [addAddress, { isLoading: addIsLoading }] = useAddAddressMutation();

  const updatedAddress = id ? { ...values, id } : values;

  async function handleSubmitAddress() {
    if (!isFormDirty) {
      onAddMessagePopup({
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

      onAddMessagePopup({
        message: popupMessage,
      });

      closeModal();
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  }

  return (
    <>
      <TriggerModalButton
        modalId={modalId}
        ariaControls={ariaControls}
        variant={BtnVariant.Ghost}
        disabled={triggerModalDisabled}
        className={triggerModalClassName}
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
        headerText={modalHeaderText}
        modalSize="medium"
        isLoading={isLoading || addIsLoading}
        onSubmit={onSubmit}
        disabled={!!id && !isFormDirty}
        submitLabel={primaryActionBtnLabel}
        className="address-modal"
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
