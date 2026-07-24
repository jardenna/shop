import { CheckoutResponse } from '../../../app/api/apiTypes/cartApiTypes';
import { PaymentMethods } from '../../../app/api/apiTypes/paymentApiTypes';
import RadioBtnList from '../../../components/formElements/radioList/RadioBtnList';
import { paymentMethodsList } from '../../../config/paymentConfig';
import type {
  InputChangeHandler,
  RefBtnType,
  RefElementType,
} from '../../../types/types';
import PaymentMethodsList from '../../cart/components/PaymentMethodsList';
import CardForm from './paymentForms/CardForm';

export interface BasePaymentProps {
  addAddressButtonRef: RefBtnType;
  addressLength: number;
  addressSectionRef: RefElementType;
  checkout: CheckoutResponse;
  language: Record<string, string>;
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
}: PaymentProps) => {
  const availablePaymentMethods = paymentMethodsList.filter((method) =>
    paymentMethod.includes(method.id),
  );

  const methodToShow = availablePaymentMethods.find(
    (method) => method.id === values.paymentMethod,
  );

  const paymentMethodListnew = availablePaymentMethods.map(({ id, label }) => ({
    label,
    value: id,
    id,
  }));

  return (
    <div>
      <form className="select-payment-method" noValidate>
        <RadioBtnList
          onChange={onChange}
          value={values.paymentMethod}
          radioList={paymentMethodListnew}
          name={name}
        />
        <PaymentMethodsList paymentMethods={paymentMethod} />
      </form>
      {methodToShow && (
        <CardForm
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
