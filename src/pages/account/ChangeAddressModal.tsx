import { useId } from 'react';
import { Address } from '../../app/api/apiTypes/addressApiTypes';
import FieldSet from '../../components/fieldset/FieldSet';
import RadioButtonList from '../../components/formElements/radioList/RadioButtonList';
import FormModal from '../../components/Modal/FormModal';
import TriggerModalButton from '../../components/Modal/TriggerModalButton';
import { useFormValidation } from '../../hooks/useFormValidation';
import { BtnVariant } from '../../types/enums';

interface ChangeAddressModalProps {
  addresses: Address[];
  billingAddressId: string;
  shippingAddressId: string;
}

const ChangeAddressModal = ({
  addresses,
  shippingAddressId,
  billingAddressId,
}: ChangeAddressModalProps) => {
  const ariaControls = useId();
  const modalId = 'changeAddress';

  const initialState = { shippingAddressId, billingAddressId };

  const { onChange, values } = useFormValidation({
    initialState,
  });
  console.log(addresses);

  return (
    <section>
      <TriggerModalButton
        ariaControls={ariaControls}
        modalId={modalId}
        variant={BtnVariant.Ghost}
      >
        Vælg standard addresse
      </TriggerModalButton>

      <FormModal
        modalId={modalId}
        ariaControls={ariaControls}
        headerText="Vælg standard addresse"
        isLoading={false}
        onSubmit={() => {
          console.log(23);
        }}
        disabled={false}
        submitLabel="change"
      >
        <FieldSet legendText="Faktureringsadresse" showLegendText>
          <RadioButtonList
            radioButtonList={addresses.map((address) => ({
              id: `${address.id}-billing`,
              label: `${address.street}, ${address.zipCode} ${address.city}`,
              value: address.id,
            }))}
            value={values.billingAddressId}
            name="billingAddressId"
            onChange={onChange}
          />
        </FieldSet>

        <FieldSet legendText="Leveringsadresse" showLegendText>
          <RadioButtonList
            radioButtonList={addresses.map((address) => ({
              id: `${address.id}-shipping`,
              label: `${address.street}, ${address.zipCode} ${address.city}`,
              value: address.id,
            }))}
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
