import { useId } from 'react';
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
}: BaseAddressListProps) => {
  const ariaControls = useId();
  const modalId = 'changeAddress';

  const initialState = { shippingAddressId, billingAddressId };

  const { onChange, values } = useFormValidation({
    initialState,
  });

  const getAddressOptions = (
    addressType: 'billing' | 'shipping',
  ): OptionTypeNew[] =>
    addresses.map((address) => ({
      id: `${address.id}-${addressType}`,
      label: `${address.street}, ${address.zipCode} ${address.city}`,
      value: address.id,
    }));

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
        onSubmit={() => {
          console.log(23);
        }}
        disabled={false}
        submitLabel="change"
      >
        <FieldSet legendText={language.addressBilling} showLegendText>
          <RadioButtonList
            radioButtonList={getAddressOptions('billing')}
            value={values.billingAddressId}
            name="billingAddressId"
            onChange={onChange}
          />
        </FieldSet>

        <FieldSet legendText={language.addressDelivery} showLegendText>
          <RadioButtonList
            radioButtonList={getAddressOptions('shipping')}
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
