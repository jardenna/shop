import { PaymentMethod } from '../../../app/api/apiTypes/shopApiTypes';
import RadioBtnList from '../../../components/formElements/radioList/RadioBtnList';
import { useFormValidation } from '../../../hooks/useFormValidation';

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

  console.log(methodToShow);

  return (
    <section>
      <h2 className="checkout-title">Payment</h2>
      <RadioBtnList
        onChange={onChange}
        value={values.paymentMethod}
        radioList={paymentMethodList}
        name="paymentMethod"
      />
      <ul>
        {paymentMethod.map((payment) => (
          <li key={payment.id}>
            {payment.label}
            {values.paymentMethod.toLowerCase() === 'visa' && (
              <div>
                {payment.fields.map((field) => (
                  <div key={field.label}>{field.label} </div>
                ))}
                line
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Payment;
