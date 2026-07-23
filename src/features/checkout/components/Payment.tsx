import { CheckoutResponse } from '../../../app/api/apiTypes/cartApiTypes';
import { PaymentMethods } from '../../../app/api/apiTypes/paymentApiTypes';
import RadioBtnList from '../../../components/formElements/radioList/RadioBtnList';
import { paymentMethodsList } from '../../../config/paymentConfig';
import { InputChangeHandler } from '../../../types/types';
import PaymentMethodsList from '../../cart/components/PaymentMethodsList';
import CardForm from './paymentForms/CardForm';

interface PaymentProps {
  checkout: CheckoutResponse;
  language: Record<string, string>;
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
  paymentMethod,
  language,
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
      <form className="select-payment-method">
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
          fields={methodToShow.fields}
          key={methodToShow.id}
          language={language}
          checkout={checkout}
          paymentMethod={values.paymentMethod}
        />
      )}
    </div>
  );
};

export default Payment;
