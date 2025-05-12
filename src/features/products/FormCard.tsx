import { ReactNode } from 'react';
import FieldSet from '../../components/fieldset/FieldSet';

type FormCardProps = {
  children: ReactNode;
  legendText: string;
};

const FormCard = ({ children, legendText }: FormCardProps) => (
  <section className="form-card">
    <FieldSet legendText={legendText}>{children}</FieldSet>
  </section>
);

export default FormCard;
