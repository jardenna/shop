import { PaymentMethodField } from '../../../../app/api/apiTypes/shopApiTypes';
import Input from '../../../../components/formElements/Input';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { InputType } from '../../../../types/types';
import { useLanguage } from '../../../language/useLanguage';

interface CardFormProps {
  fields: PaymentMethodField[];
}

const CardForm = ({ fields }: CardFormProps) => {
  const { language } = useLanguage();
  const initialValues: Record<string, string> = Object.fromEntries(
    fields.map(({ name }) => [name, '']),
  );

  const { values, onChange } = useFormValidation<Record<string, string>>({
    initialState: initialValues,
  });
  console.log(values);

  return (
    <form className="payment-form">
      {fields.map((field) => (
        <Input
          key={field.name}
          labelText={language[field.label]}
          name={field.name}
          id={field.name}
          onChange={onChange}
          value={values[field.name]}
          type={field.type as InputType}
          inputMode={field.inputMode}
          className={field.name}
        />
      ))}
    </form>
  );
};

export default CardForm;
