import {
  CheckoutResponse,
  PaymentMethods1,
} from '../../../app/api/apiTypes/cartApiTypes';
import RadioBtnList from '../../../components/formElements/radioList/RadioBtnList';
import IconContent from '../../../components/IconContent';
import { paymentMethodsList } from '../../../config/paymentConfig';
import { InputChangeHandler } from '../../../types/types';
import CardForm from './paymentForms/CardForm';

interface PaymentProps {
  checkout: CheckoutResponse;
  language: Record<string, string>;
  name: string;
  onChange: InputChangeHandler;
  paymentMethod: PaymentMethods1[];
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

  console.log(availablePaymentMethods);
  const paymentIcons = availablePaymentMethods.map((a) => a.icon);

  return (
    <div>
      <form className="select-payment-method">
        <RadioBtnList
          onChange={onChange}
          value={values.paymentMethod}
          radioList={paymentMethodListnew}
          name={name}
        />
        <ul className="payment-icon-list">
          {paymentIcons.map((payment) => (
            <li key={payment}>
              <IconContent iconName={payment} ariaLabel={payment} />
            </li>
          ))}
        </ul>
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
