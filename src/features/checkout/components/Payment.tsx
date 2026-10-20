import { ReactNode } from 'react';
import {
  PaymentFormValues,
  PaymentMethods,
} from '../../../app/api/apiTypes/paymentApiTypes';
import FieldSet from '../../../components/fieldset/FieldSet';
import Form from '../../../components/Form';
import Input from '../../../components/formElements/Input';
import { paymentMethodsList } from '../../../config/paymentConfig';
import { useFormValidation } from '../../../hooks/useFormValidation';
import type { ChangeInputType, InputType } from '../../../types/types';
import { validatePayment } from '../../../utils/validation/validatePayment';
import { formatExpiryDate } from './formatExpiryDateUtil';

interface PaymentProps {
  additionalFooterInfo: ReactNode;
  language: Record<string, string>;
  paymentMethod: PaymentMethods[];
  value: PaymentMethods;
  isLoading?: boolean;
  onSubmit: (values: PaymentFormValues) => void;
}

const Payment = ({
  value,
  paymentMethod,
  language,
  additionalFooterInfo,
  onSubmit,
  isLoading,
}: PaymentProps) => {
  const availablePaymentMethods = paymentMethodsList.filter((method) =>
    paymentMethod.includes(method.id),
  );

  const methodToShow = availablePaymentMethods.find(
    (method) => method.id === value,
  );

  const initialValues: PaymentFormValues = {
    paymentMethod: value,
    cardNumber: '',
    expiryDate: '',
    cvvCode: '',
    cardholderName: '',
    paypalEmail: '',
    paypalPassword: '',
    mobilePhoneNumber: '',
  };

  const {
    values,
    onChange,
    onSubmit: handleSubmit,
    errors,
  } = useFormValidation({
    initialState: initialValues,
    callback: onSubmit,
    validate: validatePayment,
    isLoading,
  });

  const handleChange = (event: ChangeInputType) => {
    const currentTarget = event.currentTarget;

    if (currentTarget.name === 'expiryDate') {
      currentTarget.value = formatExpiryDate(currentTarget.value);
    }

    onChange(event);
  };

  if (!methodToShow) {
    return null;
  }

  return (
    <Form
      className="payment-form"
      onSubmit={handleSubmit}
      submitBtnLabel={language.placeOrder}
      isLoading={isLoading}
      additionalFooterInfo={additionalFooterInfo}
      fixedFooter
    >
      <FieldSet
        legendText={language.payment}
        showLegendText
        legendClassname="order-flow-title"
      >
        <div className="payment-card-form">
          {methodToShow.fields.map((field) => (
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

export default Payment;
