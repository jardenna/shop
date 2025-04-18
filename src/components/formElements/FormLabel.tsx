import VisuallyHidden from '../VisuallyHidden';

type FormLabelProps = {
  id: string;
  inputLabel: string;
  inputHasNoLabel?: boolean;
  required?: boolean;
};

const FormLabel = ({
  inputLabel,
  id,
  required,
  inputHasNoLabel,
}: FormLabelProps) =>
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
