import { ReactNode } from 'react';
import { CheckoutResponse } from '../../../app/api/apiTypes/cartApiTypes';
import { PaymentMethods } from '../../../app/api/apiTypes/paymentApiTypes';
import RadioButtonList from '../../../components/formElements/radioList/RadioButtonList';
import { paymentMethodsList } from '../../../config/paymentConfig';
import type {
  InputChangeHandler,
  RefBtnType,
  RefElementType,
} from '../../../types/types';
import PaymentMethodsList from '../../cart/components/PaymentMethodsList';
import PaymentCardForm from './PaymentCardForm';

export interface BasePaymentProps {
  addAddressButtonRef: RefBtnType;
  addressLength: number;
  addressSectionRef: RefElementType;
  checkout: CheckoutResponse;
  language: Record<string, string>;
  additionalFooterInfo?: ReactNode;
}

interface PaymentProps extends BasePaymentProps {
  name: string;
  onChange: InputChangeHandler;
  paymentMethod: PaymentMethods[];
  values: {
    paymentMethod: string;
  };
}

const Payment = ({
  onChange,
  values,
  name,
  checkout,
  addressLength,
  paymentMethod,
  language,
  addAddressButtonRef,
  addressSectionRef,
  additionalFooterInfo,
}: PaymentProps) => {
  const availablePaymentMethods = paymentMethodsList.filter((method) =>
    paymentMethod.includes(method.id),
  );

  const methodToShow = availablePaymentMethods.find(
    (method) => method.id === values.paymentMethod,
  );

  const paymentMethodList = availablePaymentMethods.map(({ id, label }) => ({
    label,
    value: id,
    id,
  }));

  return (
    <div>
      <form className="select-payment-method" noValidate>
        <RadioButtonList
          onChange={onChange}
          value={values.paymentMethod}
          radioButtonList={paymentMethodList}
          name={name}
        />
        <PaymentMethodsList paymentMethods={paymentMethod} />
      </form>

      {methodToShow && (
        <PaymentCardForm
          additionalFooterInfo={additionalFooterInfo}
          addressSectionRef={addressSectionRef}
          fields={methodToShow.fields}
          key={methodToShow.id}
          language={language}
          checkout={checkout}
          paymentMethod={values.paymentMethod}
          addressLength={addressLength}
          addAddressButtonRef={addAddressButtonRef}
        />
      )}
    </div>
  );
};

export default Payment;
