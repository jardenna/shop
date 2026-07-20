import { PaymentMethod } from '../../../app/api/apiTypes/shopApiTypes';
import RadioBtnList from '../../../components/formElements/radioList/RadioBtnList';
import { useFormValidation } from '../../../hooks/useFormValidation';
import CardForm from './paymentForms/CardForm';

interface PaymentProps {
  paymentMethod: PaymentMethod[];
}

const Payment = ({ paymentMethod }: PaymentProps) => {
  const paymentMethodList = paymentMethod.map(({ id, label }) => ({
    label,
    value: id,
    id,
  }));

  const initialState = {
    paymentMethod: 'visa',
  };

  const { values, onChange } = useFormValidation({
    initialState,
  });

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
        name="paymentMethod"
      />
      {methodToShow && <CardForm fields={methodToShow.fields} />}
    </section>
  );
};

export default Payment;
