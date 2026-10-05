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
          <ul className="radio-button-list">
            {addresses.map((address) => (
              <li
                key={`${address.id}billingAddressId`}
                className="radio-button-item"
              >
                <input
                  type="radio"
                  name="billingAddressId"
                  value={values.billingAddressId}
                  id={`${address.id}billingAddressId`}
                  onChange={onChange}
                  // checked={address.id === values.billingAddressId}
                />
                <label htmlFor={`${address.id}billingAddressId`}>
                  {address.street}, {address.zipCode} {address.city}
                </label>
              </li>
            ))}
          </ul>
        </FieldSet>
        <FieldSet legendText="Leveringsadresse" showLegendText>
          <ul className="radio-button-list">
            {addresses.map((address) => (
              <li
                key={`${address.id}shippingAddressId`}
                className="radio-button-item"
              >
                <input
                  type="radio"
                  name="shippingAddressId"
                  value={values.shippingAddressId}
                  id={`${address.id}shippingAddressId`}
                  onChange={onChange}
                />
                <label htmlFor={`${address.id}shippingAddressId`}>
                  {address.street}, {address.zipCode} {address.city}
                </label>
              </li>
            ))}
          </ul>
        </FieldSet>
      </FormModal>
    </section>
  );
};

export default ChangeAddressModal;
