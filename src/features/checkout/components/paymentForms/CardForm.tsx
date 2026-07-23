import {
  CheckoutResponse,
  PaymentMethods,
} from '../../../../app/api/apiTypes/cartApiTypes';
import { PaymentMethodField } from '../../../../app/api/apiTypes/shopApiTypes';
import FieldSet from '../../../../components/fieldset/FieldSet';
import Form from '../../../../components/form/Form';
import Input from '../../../../components/formElements/Input';
import { useMessagePopup } from '../../../../components/messagePopup/useMessagePopup';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { ChangeInputType, InputType } from '../../../../types/types';
import { handleApiError } from '../../../../utils/handleApiError';
import { useCreateOrderMutation } from '../../../orders/orderApiSlice';
import { formatExpiryDate } from '../formatExpiryDateUtil';

interface CardFormProps {
  checkout: CheckoutResponse;
  fields: PaymentMethodField[];
  language: Record<string, string>;
  paymentMethod: string;
}

const CardForm = ({
  fields,
  language,
  checkout,
  paymentMethod,
}: CardFormProps) => {
  const { onAddMessagePopup } = useMessagePopup();
  const initialValues = Object.fromEntries(
    fields.map(({ name }) => [name, '']),
  );

  const { values, onChange, onSubmit } = useFormValidation({
    initialState: initialValues,
    callback: handleSubmit,
  });

  const [createOrder] = useCreateOrderMutation();

  const orderItems = checkout.cartItems.map(
    ({ productId, qty, color, size }) => ({
      productId,
      qty,
      color,
      size,
    }),
  );

  const shippingAddressId = checkout.addresses.find((address) =>
    address.standardAddress.includes('addressDelivery'),
  )?.id;

  const billingAddressId = checkout.addresses.find((address) =>
    address.standardAddress.includes('addressBilling'),
  )?.id;

  const orderPayload = {
    orderItems,
    shippingAddressId: shippingAddressId ?? '',
    billingAddressId: billingAddressId ?? '',
    payment: {
      method: paymentMethod as PaymentMethods,
    },
  };

  const handleChange = (event: ChangeInputType) => {
    const currentTarget = event.currentTarget;

    if (currentTarget.name === 'expiryDate') {
      currentTarget.value = formatExpiryDate(currentTarget.value);
    }

    onChange(event);
  };

  async function handleSubmit() {
    try {
      await createOrder(orderPayload);
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
    console.log(values);
  }

  return (
    <Form
      className="payment-form"
      onSubmit={onSubmit}
      submitBtnLabel="Place order"
    >
      <FieldSet
        legendText={language.payment}
        showLegendText
        legendClassname="order-flow-title"
      >
        <div className="card-form">
          {fields.map((field) => (
            <Input
              key={field.name}
              labelText={language[field.label]}
              name={field.name}
              id={field.name}
              onChange={handleChange}
              value={values[field.name]}
              type={field.type as InputType}
              inputMode={field.inputMode}
              className={field.name}
            />
          ))}
        </div>
      </FieldSet>
    </Form>
  );
};

export default CardForm;
