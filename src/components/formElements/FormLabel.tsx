import VisuallyHidden from '../VisuallyHidden';
import FormError from './FormError';

type FormLabelErrorProps = {
  id: string;
  labelText: string;
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
}: FormLabelErrorProps) => (
  <>
    <span className={inputHasNoLabel ? '' : 'form-label-container'}>
      {inputHasNoLabel ? (
        <VisuallyHidden htmlFor={id} as="label">
          {labelText}
        </VisuallyHidden>
      ) : (
        <label htmlFor={id}>
          {labelText}
          {required && <span aria-hidden="true">*</span>}
        </label>
      )}
      {errorText && <FormError errorText={errorText} ariaErrorId={id} />}
    </span>
    {errorText && (
      <span className="error-icon" aria-hidden="true">
        i
      </span>
    )}
  </>
);

export default FormLabel;
