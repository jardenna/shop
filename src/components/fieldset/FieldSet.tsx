import { FC, ReactNode } from 'react';
import VisuallyHidden from '../VisuallyHidden';
import './_fieldset.scss';

interface FieldSetProps {
  children: ReactNode;
  legendText: string;
  showLegendText?: boolean;
}

const FieldSet: FC<FieldSetProps> = ({
  children,
  legendText,
  showLegendText = false,
}) => (
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
