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
  }));
  const initialState = {
    paymentmethod: 'Visa',
  };

  const { values, onChange } = useFormValidation({
    initialState,
  });

  return (
    <section>
      <h2 className="checkout-title">Payment</h2>
      <RadioBtnList
        onChange={onChange}
        value={values.paymentmethod}
        radioList={paymentMethodList}
        name="paymentmethod"
      />
      <ul>
        {paymentMethod.map((payment) => (
          <li key={payment.id}>
            {payment.label}
            {payment.label.toLowerCase() === 'visa' && (
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
