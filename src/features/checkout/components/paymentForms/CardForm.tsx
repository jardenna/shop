import { PaymentMethodField } from '../../../../app/api/apiTypes/shopApiTypes';
import FieldSet from '../../../../components/fieldset/FieldSet';
import Form from '../../../../components/form/Form';
import Input from '../../../../components/formElements/Input';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { ChangeInputType, InputType } from '../../../../types/types';
import { formatExpiryDate } from '../formatExpiryDateUtil';

interface CardFormProps {
  fields: PaymentMethodField[];
  language: Record<string, string>;
}

const CardForm = ({ fields, language }: CardFormProps) => {
  const initialValues: Record<string, string> = Object.fromEntries(
    fields.map(({ name }) => [name, '']),
  );

  const { values, onChange, onSubmit } = useFormValidation<
    Record<string, string>
  >({
    initialState: initialValues,
    callback: handleSubmit,
  });

  const handleChange = (event: ChangeInputType) => {
    const currentTarget = event.currentTarget;

    if (currentTarget.name === 'expiryDate') {
      currentTarget.value = formatExpiryDate(currentTarget.value);
    }

    onChange(event);
  };

  function handleSubmit() {
    console.log(values);
  }

  return (
    <Form
      className="payment-form"
      onSubmit={onSubmit}
      submitBtnLabel="Place order"
    >
      <FieldSet
        legendText={language.payment}
        showLegendText
        legendClassname="order-flow-title"
      >
        <div className="card-form">
          {fields.map((field) => (
            <Input
              key={field.name}
              labelText={language[field.label]}
              name={field.name}
              id={field.name}
              onChange={handleChange}
              value={values[field.name]}
              type={field.type as InputType}
              inputMode={field.inputMode}
              className={field.name}
            />
          ))}
        </div>
      </FieldSet>
    </Form>
  );
};

export default CardForm;
