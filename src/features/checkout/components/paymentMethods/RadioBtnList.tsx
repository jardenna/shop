import Input from '../../../../components/formElements/Input';
import { useFormValidation } from '../../../../hooks/useFormValidation';

const RadioBtnList = () => {
  const initialState = {
    paymentmethod: 'Visa',
  };

  const paymentMethodList = [
    {
      label: 'Mastercard',
      value: 'Mastercard',
    },
    {
      label: 'PayPal',
      value: 'PayPal',
    },
    {
      label: 'MobilePay',
      value: 'MobilePay',
    },
    {
      label: 'Visa',
      value: 'Visa',
    },
  ];

  const { values, onChange } = useFormValidation({
    initialState,
  });

  console.log(values);

  return (
    <ul className="secondary-radio">
      {paymentMethodList.map((method) => (
        <li key={method.label}>
          <Input
            type="radio"
            name="paymentmethod"
            id={method.label}
            value={method.value}
            checked={values.paymentmethod === method.value}
            onChange={onChange}
            labelText={method.label}
          />
        </li>
      ))}
    </ul>
  );
};

export default RadioBtnList;
