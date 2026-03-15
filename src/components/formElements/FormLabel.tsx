import RequiredIcon from '../RequiredIcon';
import VisuallyHidden from '../VisuallyHidden';
import FormError from './FormError';

type FormLabelErrorProps = {
  id: string;
  labelText: string;
  ariaErrorId?: string;
  errorText?: string;
  inputHasNoLabel?: boolean;
  required?: boolean;
};

const FormLabel = ({
  labelText,
  id,
  required,
  inputHasNoLabel,
  errorText,
  ariaErrorId,
}: FormLabelErrorProps) => (
  <>
    {inputHasNoLabel ? (
      <VisuallyHidden htmlFor={id} as="label">
        {labelText}
      </VisuallyHidden>
    ) : (
      <span className="form-label-container">
        <label htmlFor={id}>
          {labelText}
          {required && <RequiredIcon />}
        </label>

        {errorText && (
          <FormError errorText={errorText} ariaErrorId={ariaErrorId} />
        )}
      </span>
    )}

    {errorText && (
      <span className="error-icon" aria-hidden="true">
        i
      </span>
    )}
  </>
);

export default FormLabel;
