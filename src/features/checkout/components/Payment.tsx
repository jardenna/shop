import { PaymentMethod } from '../../../app/api/apiTypes/shopApiTypes';
import FieldSet from '../../../components/fieldset/FieldSet';
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

  const paymentIcons = paymentMethod.map((a) => a.icon);

  const methodToShow = paymentMethod.find(
    (method) => method.id === values.paymentMethod,
  );

  return (
    <form className="payment-form">
      <FieldSet
        legendText={language.payment}
        showLegendText
        legendClassname="order-flow-title"
      >
        <div className="select-payment-method">
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
        </div>
        {methodToShow && (
          <CardForm
            fields={methodToShow.fields}
            key={methodToShow.id}
            language={language}
          />
        )}
      </FieldSet>
    </form>
  );
};

export default Payment;
