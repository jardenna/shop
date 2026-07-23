import {
  CheckoutResponse,
  PaymentMethods1,
} from '../../../app/api/apiTypes/cartApiTypes';
import { PaymentMethod } from '../../../app/api/apiTypes/shopApiTypes';
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
  paymentMethod: PaymentMethod[];
  paymentMethod1: PaymentMethods1[];
  values: {
    paymentMethod: string;
  };
}

const Payment = ({
  paymentMethod,
  onChange,
  values,
  name,
  checkout,
  paymentMethod1,
  language,
}: PaymentProps) => {
  const paymentMethodList = paymentMethod.map(({ id, label }) => ({
    label,
    value: id,
    id,
  }));

  const paymentIcons = paymentMethod.map((a) => a.icon);

  const methodToShow = paymentMethod.find(
    (method) => method.id === values.paymentMethod,
  );

  const availablePaymentMethods = paymentMethodsList.filter((method) =>
    paymentMethod1.includes(method.id),
  );

  console.log(availablePaymentMethods);

  return (
    <div>
      <form className="select-payment-method">
        <RadioBtnList
          onChange={onChange}
          value={values.paymentMethod}
          radioList={paymentMethodList}
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
