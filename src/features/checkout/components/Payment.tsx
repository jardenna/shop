import { PaymentMethod } from '../../../app/api/apiTypes/shopApiTypes';
import RadioBtnList from '../../../components/formElements/radioList/RadioBtnList';
import { InputChangeHandler } from '../../../types/types';
import CardForm from './paymentForms/CardForm';

interface PaymentProps {
  name: string;
  onChange: InputChangeHandler;
  paymentMethod: PaymentMethod[];
  values: {
    paymentMethod: string;
  };
}

const Payment = ({ paymentMethod, onChange, values, name }: PaymentProps) => {
  const paymentMethodList = paymentMethod.map(({ id, label }) => ({
    label,
    value: id,
    id,
  }));

  const methodToShow = paymentMethod.find(
    (method) => method.id === values.paymentMethod,
  );

  return (
    <section>
      <h2 className="checkout-title">Payment</h2>
      <RadioBtnList
        onChange={onChange}
        value={values.paymentMethod}
        radioList={paymentMethodList}
        name={name}
      />
      {methodToShow && (
        <CardForm fields={methodToShow.fields} key={methodToShow.id} />
      )}
    </section>
  );
};

export default Payment;
