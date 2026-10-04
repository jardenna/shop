import { useId } from 'react';
import { Address } from '../../app/api/apiTypes/addressApiTypes';
import FieldSet from '../../components/fieldset/FieldSet';
import FormModal from '../../components/Modal/FormModal';
import TriggerModalButton from '../../components/Modal/TriggerModalButton';
import { BtnVariant } from '../../types/enums';

interface ChangeToStandardAddressModalProps {
  addresses: Address[];
}

const ChangeToStandardAddressModal = ({
  addresses,
}: ChangeToStandardAddressModalProps) => {
  const ariaControls = useId();
  const modalId = 'changeAddress';

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
            <label key={address.id}>
              <input type="radio" name="billingAddressId" value={address.id} />
              <span>
                {address.street}, {address.zipCode} {address.city}
              </span>
            </label>
          ))}
        </FieldSet>
        <FieldSet legendText="Leveringsadresse" showLegendText>
          {addresses.map((address) => (
            <label key={address.id}>
              <input type="radio" name="shippingAddressId" value={address.id} />
              <span>
                {address.street}, {address.zipCode} {address.city}
              </span>
            </label>
          ))}
        </FieldSet>
      </FormModal>
    </section>
  );
};

export default ChangeToStandardAddressModal;
