import type { ReactNode } from 'react';
import FieldSet from '../fieldset/FieldSet';

type FormCartProps = {
  children: ReactNode;
  legendText: string;
};

const FormCart = ({ children, legendText }: FormCartProps) => (
  <div className="cart">
    <FieldSet legendText={legendText}>{children}</FieldSet>
  </div>
);

export default FormCart;
