import { useId } from 'react';
import {
  Address,
  AddressFields,
  AddressInput,
} from '../../app/api/apiTypes/addressApiTypes';
import FieldSet from '../../components/fieldset/FieldSet';
import Input from '../../components/formElements/Input';
import IconContent from '../../components/IconContent';
import FormModal from '../../components/Modal/FormModal';
import TriggerModalButton from '../../components/Modal/TriggerModalButton';
import { useModal } from '../../components/Modal/useModal';
import { useToast } from '../../components/toast/hooks/useToast';
import { useLanguage } from '../../features/language/useLanguage';
import { useFormValidation } from '../../hooks/useFormValidation';
import { BtnVariant, IconName } from '../../types/enums';
import type { InputType, RefBtnType } from '../../types/types';
import { validateAddress } from '../../utils/validation/validateAddress';

interface AddressFormModalNewProps {
  headerText: string;
  id: string | null;
  popupMessage: string;
  submitLabel: string;
  username: string;
  address?: Address;
  buttonRef?: RefBtnType;
  disabled?: boolean;
  onSubmitAddress: (address: AddressInput) => Promise<void>;
}

type AddressField = keyof AddressFields;

interface AddressFieldListProps {
  name: AddressField;
  required?: boolean;
  type?: InputType;
}

const addressInputList: AddressFieldListProps[] = [
  { name: 'name' },
  { name: 'street', required: true },
  { name: 'zipCode', required: true, type: 'number' },
  { name: 'city', required: true },
  { name: 'country' },
];

const AddressFormModalNew = ({
  id,
  address,
  username,
  headerText,
  submitLabel,
  popupMessage,
  disabled,
  buttonRef,
  onSubmitAddress,
}: AddressFormModalNewProps) => {
  const ariaControls = useId();
  const modalId = id ? `update-${id}` : 'create';
  const { language } = useLanguage();
  const { onAddToast } = useToast();
  const { closeModal } = useModal();

  const initialState: AddressInput = {
    name: address?.name || username,
    street: address?.street ?? '',
    zipCode: address?.zipCode ?? '',
    city: address?.city ?? '',
    country: address?.country ?? 'Danmark',
    standardAddress: address?.standardAddress ?? [],
    id: id ?? null,
  };

  const { values, onChange, onSubmit, errors, isFormDirty, onClearAllValues } =
    useFormValidation({
      initialState,
      callback: handleSubmitAddress,
      validate: validateAddress,
    });

  async function handleSubmitAddress() {
    if (!isFormDirty) {
      onAddToast({
        message: language.noChanges,
      });
      return;
    }

    await onSubmitAddress(values);

    if (!id) {
      onClearAllValues();
    }

    onAddToast({
      message: popupMessage,
    });

    closeModal();
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
            size="1.2rem"
          />
        )}
      </TriggerModalButton>

      <FormModal
        modalId={modalId}
        ariaControls={ariaControls}
        headerText={headerText}
        isLoading={false}
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
          </div>
        </FieldSet>
      </FormModal>
    </>
  );
};

export default AddressFormModalNew;
