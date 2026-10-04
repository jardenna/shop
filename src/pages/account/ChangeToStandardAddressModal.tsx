import { useId } from 'react';
import FieldSet from '../../components/fieldset/FieldSet';
import FormModal from '../../components/Modal/FormModal';
import TriggerModalButton from '../../components/Modal/TriggerModalButton';
import { BtnVariant } from '../../types/enums';

const ChangeToStandardAddressModal = () => {
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
        <FieldSet legendText="change">dd</FieldSet>
      </FormModal>
    </section>
  );
};
export default ChangeToStandardAddressModal;
