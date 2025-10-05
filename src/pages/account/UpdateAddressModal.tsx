import type { Address } from '../../app/api/apiTypes/shopApiTypes';
import FieldSet from '../../components/fieldset/FieldSet';
import Input from '../../components/formElements/Input';
import IconContent from '../../components/IconContent';
import {
  PrimaryActionBtnProps,
  SecondaryActionBtnProps,
} from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';
import { BtnVariant, IconName, SizeVariant } from '../../types/enums';

const addressInputs: (keyof Address)[] = [
  'name',
  'street',
  'zipCode',
  'city',
  'country',
];

export type UpdateAddressModalProps = {
  address: Address;
  id: string;
  username: string;
  onUpdateAddress: (id: string) => void;
};

const UpdateAddressModal = ({
  id,
  address,
  username,
  onUpdateAddress,
}: UpdateAddressModalProps) => {
  const { language } = useLanguage();
  const primaryActionBtn: PrimaryActionBtnProps = {
    onClick: () => {
      onUpdateAddress(id);
    },
    label: language.update,
  };

  const initialState: Address = {
    name: address.name || username,
    street: address.street,
    zipCode: address.zipCode,
    city: address.city,
    country: address.country,
    id,
  };

  const { values, onChange } = useFormValidation({
    initialState,
    callback: handleSubmit,
  });

  function handleSubmit() {
    console.log(123);
  }

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
      <FieldSet legendText="Enter your address details" hideLegendText>
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
