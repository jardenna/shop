import { ReactNode } from 'react';
import VisuallyHidden from '../VisuallyHidden';
import './_fieldset.scss';

type FieldSetProps = {
  children: ReactNode;
  legendText: string;
  className?: string;
  hideLegendText?: boolean;
};

const FieldSet = ({
  children,
  legendText,
  hideLegendText,
  className = '',
}: FieldSetProps) => (
  <fieldset className={`fieldset ${className}`}>
    {hideLegendText ? (
      <VisuallyHidden as="legend">{legendText}</VisuallyHidden>
    ) : (
      <legend>{legendText}</legend>
    )}
    {children}
  </fieldset>
);

export default FieldSet;
