import VisuallyHidden from '../VisuallyHidden';

type FormLabelProps = {
  id: string;
  labelText: string;
  inputHasNoLabel?: boolean;
  required?: boolean;
};

const FormLabel = ({
  labelText,
  id,
  required,
  inputHasNoLabel,
}: FormLabelProps) =>
  inputHasNoLabel ? (
    <VisuallyHidden htmlFor={id} as="label">
      {labelText}
    </VisuallyHidden>
  ) : (
    <label htmlFor={id}>
      {labelText}
      {required && <span aria-hidden="true">*</span>}
    </label>
  );

export default FormLabel;
