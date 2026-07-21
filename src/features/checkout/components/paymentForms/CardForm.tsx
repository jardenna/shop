import { PaymentMethodField } from '../../../../app/api/apiTypes/shopApiTypes';
import Input from '../../../../components/formElements/Input';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { InputType } from '../../../../types/types';
import { useLanguage } from '../../../language/useLanguage';
import { formatExpiryDate } from '../formatExpiryDateUtil';

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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentTarget = event.currentTarget;

    if (currentTarget.name === 'expiryDate') {
      currentTarget.value = formatExpiryDate(currentTarget.value);
    }

    onChange(event);
  };

  return (
    <form className="payment-form">
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
    </form>
  );
};

export default CardForm;
