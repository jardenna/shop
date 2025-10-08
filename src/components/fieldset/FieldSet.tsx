import type { ReactNode } from 'react';
import VisuallyHidden from '../VisuallyHidden';
import './_fieldset.scss';

type FieldSetProps = {
  children: ReactNode;
  legendText: string;
  showLegendText?: boolean;
};

const FieldSet = ({ children, legendText, showLegendText }: FieldSetProps) => (
  <fieldset className="fieldset">
    {!showLegendText ? (
      <VisuallyHidden as="legend">{legendText}</VisuallyHidden>
    ) : (
      <legend>{legendText}</legend>
    )}
    {children}
  </fieldset>
);

export default FieldSet;
