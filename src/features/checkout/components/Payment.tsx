import { PaymentMethod } from '../../../app/api/apiTypes/shopApiTypes';
import RadioBtnList from '../../../components/formElements/radioList/RadioBtnList';
import IconContent from '../../../components/IconContent';
import { InputChangeHandler } from '../../../types/types';
import CardForm from './paymentForms/CardForm';

interface PaymentProps {
  language: Record<string, string>;
  name: string;
  onChange: InputChangeHandler;
  paymentMethod: PaymentMethod[];
  values: {
    paymentMethod: string;
  };
}

const Payment = ({
  paymentMethod,
  onChange,
  values,
  name,
  language,
}: PaymentProps) => {
  const paymentMethodList = paymentMethod.map(({ id, label }) => ({
    label,
    value: id,
    id,
  }));

  const methodToShow = paymentMethod.find(
    (method) => method.id === values.paymentMethod,
  );
  const x = paymentMethod.map((a) => a.icon);
  return (
    <form>
      <h2 className="checkout-title">Payment</h2>
      <RadioBtnList
        onChange={onChange}
        value={values.paymentMethod}
        radioList={paymentMethodList}
        name={name}
      />
      <ul className="payment-method-list">
        {x.map((payment) => (
          <li key={payment}>
            <IconContent iconName={payment} ariaLabel={payment} />
          </li>
        ))}
      </ul>
      {methodToShow && (
        <CardForm
          fields={methodToShow.fields}
          key={methodToShow.id}
          language={language}
        />
      )}
    </form>
  );
};

export default Payment;
