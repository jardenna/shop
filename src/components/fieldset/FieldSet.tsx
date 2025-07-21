import { ReactNode } from 'react';
import VisuallyHidden from '../VisuallyHidden';
import './_fieldset.scss';

type FieldSetProps = {
  children: ReactNode;
  legendText: string;
  hideLegendText?: boolean;
};

const FieldSet = ({ children, legendText, hideLegendText }: FieldSetProps) => (
  <fieldset className="fieldset">
    {hideLegendText ? (
      <VisuallyHidden as="legend">{legendText}</VisuallyHidden>
    ) : (
      <legend>{legendText}</legend>
    )}
    {children}
  </fieldset>
);

export default FieldSet;
