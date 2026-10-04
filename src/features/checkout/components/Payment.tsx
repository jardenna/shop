import { ReactNode } from 'react';
import {
  PaymentFormValues,
  PaymentMethods,
} from '../../../app/api/apiTypes/paymentApiTypes';
import FieldSet from '../../../components/fieldset/FieldSet';
import Form from '../../../components/Form';
import Input from '../../../components/formElements/Input';
import { paymentMethodsList } from '../../../config/paymentConfig';
import { KeyValuePair } from '../../../hooks/useFormValidation';
import type { ChangeInputType, InputType } from '../../../types/types';

export interface BasePaymentProps {
  language: Record<string, string>;
  additionalFooterInfo?: ReactNode;
}

interface PaymentProps extends BasePaymentProps {
  errors: KeyValuePair<string>;
  paymentMethod: PaymentMethods[];
  value: PaymentMethods;
  values: PaymentFormValues;
  onChange: (event: ChangeInputType) => void;
  onSubmit: () => void;
}

const Payment = ({
  value,
  paymentMethod,
  language,
  additionalFooterInfo,
  onSubmit,
  onChange,
  errors,
  values,
}: PaymentProps) => {
  const availablePaymentMethods = paymentMethodsList.filter((method) =>
    paymentMethod.includes(method.id),
  );

  const methodToShow = availablePaymentMethods.find(
    (method) => method.id === value,
  );

  return (
    methodToShow && (
      <Form
        className="payment-form"
        onSubmit={onSubmit}
        submitBtnLabel={language.placeOrder}
        // isLoading={isCreateOrderLoading || isLoading}
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
                onChange={onChange}
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
    )
  );
};

export default Payment;
