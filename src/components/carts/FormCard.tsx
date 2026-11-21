import type { ReactNode } from 'react';
import FieldSet from '../fieldset/FieldSet';

interface FormCardProps {
  children: ReactNode;
  legendText: string;
}

const FormCard = ({ children, legendText }: FormCardProps) => (
  <div className="cart">
    <FieldSet legendText={legendText}>{children}</FieldSet>
  </div>
);

export default FormCard;
