import { useId } from 'react';
import { StandardAddress } from '../../app/api/apiTypes/addressApiTypes';
import FieldSet from '../../components/fieldset/FieldSet';
import RadioButtonList from '../../components/formElements/radioList/RadioButtonList';
import FormModal from '../../components/Modal/FormModal';
import TriggerModalButton from '../../components/Modal/TriggerModalButton';
import { BaseAddressListProps } from '../../features/checkout/components/CheckoutAddressList';
import { useFormValidation } from '../../hooks/useFormValidation';
import { BtnVariant } from '../../types/enums';
import { OptionTypeNew } from '../../types/types';

const ChangeAddressModal = ({
  addresses,
  shippingAddressId,
  billingAddressId,
  language,
  onSelectAddress,
}: BaseAddressListProps) => {
  const ariaControls = useId();
  const modalId = 'changeAddress';

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
  }

  return (
    <section>
      <TriggerModalButton
        ariaControls={ariaControls}
        modalId={modalId}
        variant={BtnVariant.Ghost}
      >
        {language.changeStandardAddress}
      </TriggerModalButton>

      <FormModal
        modalId={modalId}
        ariaControls={ariaControls}
        headerText={language.changeStandardAddress}
        isLoading={false}
        onSubmit={onSubmit}
        disabled={false}
        submitLabel="change"
      >
        <FieldSet legendText={language.addressBilling} showLegendText>
          <RadioButtonList
            radioButtonList={getAddressOptions('addressBilling')}
            value={values.billingAddressId}
            name="billingAddressId"
            onChange={onChange}
          />
        </FieldSet>

        <FieldSet legendText={language.addressDelivery} showLegendText>
          <RadioButtonList
            radioButtonList={getAddressOptions('addressDelivery')}
            value={values.shippingAddressId}
            name="shippingAddressId"
            onChange={onChange}
          />
        </FieldSet>
      </FormModal>
    </section>
  );
};

export default ChangeAddressModal;
