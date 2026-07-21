import { PaymentMethodField } from '../../../../app/api/apiTypes/shopApiTypes';
import Input from '../../../../components/formElements/Input';
import IconContent from '../../../../components/IconContent';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import { IconName } from '../../../../types/enums';
import { ChangeInputType, InputType } from '../../../../types/types';
import { formatExpiryDate } from '../formatExpiryDateUtil';

interface CardFormProps {
  fields: PaymentMethodField[];
  iconMap: IconName[];
  language: Record<string, string>;
}

const CardForm = ({ fields, language, iconMap }: CardFormProps) => {
  const initialValues: Record<string, string> = Object.fromEntries(
    fields.map(({ name }) => [name, '']),
  );

  const { values, onChange } = useFormValidation<Record<string, string>>({
    initialState: initialValues,
  });
  const handleChange = (event: ChangeInputType) => {
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
      <div>
        <ul className="payment-method-list">
          {iconMap.map((payment) => (
            <li key={payment}>
              <IconContent iconName={payment} ariaLabel={payment} />
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default CardForm;
