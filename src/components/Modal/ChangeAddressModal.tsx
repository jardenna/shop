import { useId } from 'react';
import { StandardAddress } from '../../app/api/apiTypes/addressApiTypes';
import { BaseAddressListProps } from '../../features/checkout/components/CheckoutAddressList';
import { useFormValidation } from '../../hooks/useFormValidation';
import { BtnVariant } from '../../types/enums';
import { OptionTypeNew } from '../../types/types';
import FieldSet from '../fieldset/FieldSet';
import RadioButtonList from '../formElements/radioList/RadioButtonList';
import FormModal from './FormModal';
import TriggerModalButton from './TriggerModalButton';
import { useModal } from './useModal';

interface ChangeAddressModalProps extends BaseAddressListProps {
  text?: string;
}
const ChangeAddressModal = ({
  addresses,
  shippingAddressId,
  billingAddressId,
  language,
  onSelectAddress,
  text,
}: ChangeAddressModalProps) => {
  const ariaControls = useId();
  const modalId = 'changeAddress';
  const { closeModal } = useModal();

  const initialState = {
    billingAddressId,
    shippingAddressId,
  };

  const { onChange, values, onSubmit } = useFormValidation({
    initialState,
    callback: handleSubmit,
  });

  const getAddressOptions = (addressType: StandardAddress): OptionTypeNew[] =>
    addresses.map((address) => ({
      id: `${address.id}-${addressType}`,
      label: `${address.street}, ${address.zipCode} ${address.city}`,
      value: address.id,
    }));

  function handleSubmit() {
    onSelectAddress(values);
    closeModal();
  }

  return (
    <section>
      <TriggerModalButton
        ariaControls={ariaControls}
        modalId={modalId}
        variant={BtnVariant.Ghost}
      >
        {text ?? language.changeStandardAddress}
      </TriggerModalButton>

      <FormModal
        modalId={modalId}
        ariaControls={ariaControls}
        headerText={text ?? language.changeStandardAddress}
        isLoading={false}
        onSubmit={onSubmit}
        disabled={false}
        submitLabel={language.save}
      >
        <FieldSet
          legendText={text ?? language.changeStandardAddress}
          className="change-address-modal"
        >
          <div>
            <h3 className="change-address-title">Skift faktureringsadresse</h3>
            <RadioButtonList
              radioButtonList={getAddressOptions('addressBilling')}
              value={values.billingAddressId}
              name="billingAddressId"
              onChange={onChange}
            />
          </div>

          <div>
            <h3 className="change-address-title">Skift leveringsadresse</h3>
            <RadioButtonList
              radioButtonList={getAddressOptions('addressDelivery')}
              value={values.shippingAddressId}
              name="shippingAddressId"
              onChange={onChange}
            />
          </div>
        </FieldSet>
      </FormModal>
    </section>
  );
};

export default ChangeAddressModal;
