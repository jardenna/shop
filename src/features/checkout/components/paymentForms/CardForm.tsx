import { PaymentMethodField } from '../../../../app/api/apiTypes/shopApiTypes';
import Input from '../../../../components/formElements/Input';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { useLanguage } from '../../../language/useLanguage';

interface CardFormProps {
  fields: PaymentMethodField[];
}

const CardForm = ({ fields }: CardFormProps) => {
  const { language } = useLanguage();
  const initialState = {
    cardNumber: '',
    expiryDate: '',
  };

  const { values, onChange } = useFormValidation({
    initialState,
  });
  console.log(fields);

  return (
    <form>
      {fields.map((field) => (
        <Input
          key={field.name}
          labelText={language[field.label]}
          name={field.name}
          id={field.name}
          onChange={onChange}
          value={values[field.name as keyof typeof values]}
          type={field.type as any}
          inputMode={field.inputMode}
        />
      ))}
    </form>
  );
};

export default CardForm;
