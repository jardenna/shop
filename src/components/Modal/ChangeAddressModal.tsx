import { useId } from 'react';
import { StandardAddress } from '../../app/api/apiTypes/addressApiTypes';
import { useFormValidation } from '../../hooks/useFormValidation';
import { BtnVariant, IconName } from '../../types/enums';
import { OptionType } from '../../types/types';
import { BaseAddressListProps } from '../../utils/addressUtils';
import FieldSet from '../fieldset/FieldSet';
import RadioButtonList from '../formElements/radioList/RadioButtonList';
import IconContent from '../IconContent';
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
  onChangeAddress,
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

  const getAddressOptions = (addressType: StandardAddress): OptionType[] =>
    addresses.map((address) => ({
      id: `${address.id}-${addressType}`,
      label: `${address.street}, ${address.zipCode} ${address.city}`,
      value: address.id,
    }));

  function handleSubmit() {
    onChangeAddress(values);
    closeModal();
  }

  return (
    <>
      <TriggerModalButton
        ariaControls={ariaControls}
        modalId={modalId}
        variant={BtnVariant.Ghost}
      >
        <IconContent
          iconName={IconName.Refresh}
          size="1rem"
          ariaLabel={text ?? language.changeStandardAddress}
          showLabel
        />
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
            <h3 className="change-address-title">
              {language.changeBillingAddress}
            </h3>
            <RadioButtonList
              radioButtonList={getAddressOptions('addressBilling')}
              value={values.billingAddressId}
              name="billingAddressId"
              onChange={onChange}
            />
          </div>

          <div>
            <h3 className="change-address-title">
              {language.changeDeliveryAddress}
            </h3>
            <RadioButtonList
              radioButtonList={getAddressOptions('addressDelivery')}
              value={values.shippingAddressId}
              name="shippingAddressId"
              onChange={onChange}
            />
          </div>
        </FieldSet>
      </FormModal>
    </>
  );
};

export default ChangeAddressModal;
