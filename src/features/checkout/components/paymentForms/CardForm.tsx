import { PaymentMethodField } from '../../../../app/api/apiTypes/shopApiTypes';

interface CardFormProps {
  fields: PaymentMethodField[];
}

const CardForm = ({ fields }: CardFormProps) => {
  console.log(fields);

  return (
    <section>
      {fields.map((field) => (
        <div key={field.name}>{field.label}</div>
      ))}
    </section>
  );
};

export default CardForm;
