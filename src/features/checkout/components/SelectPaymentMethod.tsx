import { PaymentMethods } from '../../../app/api/apiTypes/paymentApiTypes';
import RadioButtonList from '../../../components/formElements/radioList/RadioButtonList';
import { InputChangeHandler } from '../../../types/types';
import PaymentMethodsList from '../../cart/components/PaymentMethodsList';

interface PaymentMethodList {
  id: PaymentMethods;
  label: string;
  value: PaymentMethods;
}

interface SelectPaymentMethodProps {
  onChange: InputChangeHandler;
  paymentMethodList: PaymentMethodList[];
  paymentMethods: PaymentMethods[];
  value: PaymentMethods;
}

const SelectPaymentMethod = ({
  value,
  onChange,
  paymentMethodList,
  paymentMethods,
}: SelectPaymentMethodProps) => (
  <form className="select-payment-method" noValidate>
    <RadioButtonList
      onChange={onChange}
      value={value}
      radioButtonList={paymentMethodList}
      name="paymentMethod"
    />
    <PaymentMethodsList paymentMethods={paymentMethods} />
  </form>
);
export default SelectPaymentMethod;
