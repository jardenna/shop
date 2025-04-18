import { ReactNode } from 'react';
import VisuallyHidden from '../VisuallyHidden';
import './_fieldset.scss';

type FieldSetProps = {
  children: ReactNode;
  legendText: string;
  className?: string;
  showLegendText?: boolean;
};

const FieldSet = ({
  children,
  legendText,
  showLegendText = false,
  className = '',
}: FieldSetProps) => (
  <fieldset className={`fieldset ${className}`}>
    {!showLegendText ? (
      <VisuallyHidden as="legend">{legendText}</VisuallyHidden>
    ) : (
      <legend>{legendText}</legend>
    )}
    {children}
  </fieldset>
);

export default FieldSet;
