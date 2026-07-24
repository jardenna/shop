import {
  PaymentFormValues,
  PaymentMethodField,
  PaymentMethods,
} from '../../../../app/api/apiTypes/paymentApiTypes';

import FieldSet from '../../../../components/fieldset/FieldSet';
import Form from '../../../../components/form/Form';
import Input from '../../../../components/formElements/Input';
import { useMessagePopup } from '../../../../components/messagePopup/useMessagePopup';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { ChangeInputType, InputType } from '../../../../types/types';
import { handleApiError } from '../../../../utils/handleApiError';
import { validatePayment } from '../../../../utils/validation/validatePayment';
import {
  useCreateOrderMutation,
  usePayOrderMutation,
} from '../../../orders/orderApiSlice';
import { formatExpiryDate } from '../formatExpiryDateUtil';
import { BasePaymentProps } from '../Payment';

interface CardFormProps extends BasePaymentProps {
  fields: PaymentMethodField[];
  paymentMethod: string;
}

const CardForm = ({
  fields,
  language,
  checkout,
  paymentMethod,
  addressSectionRef,
  addAddressButtonRef,
  addressLength,
}: CardFormProps) => {
  const { onAddMessagePopup } = useMessagePopup();
  const initialValues: PaymentFormValues = {
    paymentMethod: paymentMethod as PaymentMethods,
    cardNumber: '',
    expiryDate: '',
    cvvCode: '',
    cardholderName: '',
    paypalEmail: '',
    paypalPassword: '',
    mobilePhoneNumber: '',
  };

  const { values, onChange, onSubmit, errors } = useFormValidation({
    initialState: initialValues,
    callback: handleSubmit,
    validate: validatePayment,
  });

  const [createOrder] = useCreateOrderMutation();
  const [payOrder] = usePayOrderMutation();

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
    if (addressLength === 0) {
      addressSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      addAddressButtonRef.current?.focus();

      onAddMessagePopup({
        message: language.addressRequiredToPlaceOrder,
        messagePopupType: 'info',
      });
      return;
    }
    try {
      const order = await createOrder(orderPayload).unwrap();

      await payOrder({
        orderId: order.id,
        method: paymentMethod,
        ...values,
      }).unwrap();

      onAddMessagePopup({
        message: 'order placed',
      });
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  }

  return (
    <Form
      className="payment-form"
      onSubmit={onSubmit}
      submitBtnLabel={language.placeOrder}
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
              required
              errorText={
                errors[field.name] ? language[errors[field.name]] : undefined
              }
            />
          ))}
        </div>
      </FieldSet>
    </Form>
  );
};

export default CardForm;
