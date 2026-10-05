import { useId } from 'react';
import { Address } from '../../app/api/apiTypes/addressApiTypes';
import FieldSet from '../../components/fieldset/FieldSet';
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
          {addresses.map((address) => (
            <>
              <input
                type="radio"
                name="billingAddressId"
                value={values.billingAddressId}
                id={address.id}
                onChange={onChange}
              />
              <label key={address.id} htmlFor={address.id}>
                {address.street}, {address.zipCode} {address.city}
              </label>
            </>
          ))}
        </FieldSet>
        <FieldSet legendText="Leveringsadresse" showLegendText>
          {addresses.map((address) => (
            <>
              <input
                type="radio"
                name="shippingAddressId"
                value={values.shippingAddressId}
                id={address.id}
                onChange={onChange}
              />
              <label key={address.id} htmlFor={address.id}>
                {address.street}, {address.zipCode} {address.city}
              </label>
            </>
          ))}
        </FieldSet>
      </FormModal>
    </section>
  );
};

export default ChangeAddressModal;
