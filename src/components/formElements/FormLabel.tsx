import { FC } from 'react';
import VisuallyHidden from '../VisuallyHidden';

interface FormLabelProps {
  id: string;
  inputLabel: string;
  inputHasNoLabel?: boolean;
  required?: boolean;
}

const FormLabel: FC<FormLabelProps> = ({
  inputLabel,
  id,
  required,
  inputHasNoLabel,
}) =>
  inputHasNoLabel ? (
    <VisuallyHidden htmlFor={id} as="label">
      {inputLabel}
    </VisuallyHidden>
  ) : (
    <label className="form-label" htmlFor={id}>
      {inputLabel}
      {required && <span aria-hidden="true">*</span>}
    </label>
  );

export default FormLabel;
