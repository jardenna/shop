import type { ReactNode } from 'react';
import VisuallyHidden from '../VisuallyHidden';
import './_fieldset.scss';

type FieldSetProps = {
  children: ReactNode;
  legendText: string;
  className?: string;
  legendClassname?: string;
  showLegendText?: boolean;
};

const FieldSet = ({
  children,
  legendText,
  showLegendText,
  className = '',
  legendClassname,
}: FieldSetProps) => (
  <fieldset className={`fieldset ${className}`}>
    {!showLegendText ? (
      <VisuallyHidden as="legend">{legendText}</VisuallyHidden>
    ) : (
      <legend className={legendClassname}>{legendText}</legend>
    )}
    {children}
  </fieldset>
);

export default FieldSet;
