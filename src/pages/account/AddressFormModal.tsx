import { StandardAddress } from '../../app/api/apiTypes/sharedApiTypes';
import type {
  Address,
  AddressInput,
} from '../../app/api/apiTypes/shopApiTypes';
import FieldSet from '../../components/fieldset/FieldSet';
import CheckboxList from '../../components/formElements/checkbox/CheckboxList';
import Input from '../../components/formElements/Input';
import IconContent from '../../components/IconContent';
import { useMessagePopup } from '../../components/messagePopup/useMessagePopup';
import {
  PrimaryActionBtnProps,
  SecondaryActionBtnProps,
} from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
import { useSubmitStatus } from '../../components/modal/useSubmitStatus';
import { useLanguage } from '../../features/language/useLanguage';
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from '../../features/profile/profileApiSlice';
import { useFormValidation } from '../../hooks/useFormValidation';
import { BtnVariant, IconName, SizeVariant } from '../../types/enums';
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
  secondaryActionBtn?: SecondaryActionBtnProps | null;
  triggerModalDisabled?: boolean;
};

type AddressField = Extract<
  keyof AddressInput,
  'name' | 'street' | 'zipCode' | 'city' | 'country'
>;

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
  secondaryActionBtn,
}: AddressFormModalProps) => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const { resultSuccess, setResultSuccess } = useSubmitStatus();

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

  const { values, onChange, onSubmit, errors, onClearAllValues, isFormDirty } =
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
    if (!isFormDirty) {
      onAddMessagePopup({
        message: language.noChanges,
      });
      return;
    }

    try {
      if (id) {
        await updateAddress({ address: updatedAddress }).unwrap();
        setResultSuccess(true);
      } else {
        await addAddress({ address: updatedAddress }).unwrap();
        setResultSuccess(true);
      }

      onAddMessagePopup({ message: popupMessage });
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
      setResultSuccess(false);
      onClearAllValues();
    }
  }

  const primaryActionBtn: PrimaryActionBtnProps = {
    onSubmit,
    buttonType: 'submit',
    label: primaryActionBtnLabel,
    disabled: !!id && !isFormDirty,
    showBtnLoader: isLoading || addIsLoading,
    resultSuccess,
    isForm: true,
  };

  return (
    <ModalContainer
      triggerModalDisabled={triggerModalDisabled}
      // onClearAllValues={onClearAllValues}
      onBoundaryReset={id ? reset : addReset}
      modalSize={SizeVariant.Md}
      triggerModalBtnContent={
        id ? (
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
        <div className="address-form">
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

          <CheckboxList
            checkBoxList={standardAddressList}
            name="standardAddress"
            onChange={onChange}
            values={values.standardAddress}
            language={language}
          />
        </div>
      </FieldSet>
    </ModalContainer>
  );
};

export default AddressFormModal;
