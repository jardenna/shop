import { ReactNode } from 'react';
import { CheckoutResponse } from '../../../app/api/apiTypes/cartApiTypes';
import { PaymentMethods } from '../../../app/api/apiTypes/paymentApiTypes';
import { paymentMethodsList } from '../../../config/paymentConfig';
import type { RefBtnType, RefElementType } from '../../../types/types';
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
  paymentMethod: PaymentMethods[];
  value: PaymentMethods;
}

const Payment = ({
  value,
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
    (method) => method.id === value,
  );

  return (
    methodToShow && (
      <PaymentCardForm
        additionalFooterInfo={additionalFooterInfo}
        addressSectionRef={addressSectionRef}
        fields={methodToShow.fields}
        key={methodToShow.id}
        language={language}
        checkout={checkout}
        paymentMethod={value}
        addressLength={addressLength}
        addAddressButtonRef={addAddressButtonRef}
      />
    )
  );
};

export default Payment;
