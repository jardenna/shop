import type { refTextareaType } from '../../types/types';
import FormLabel from './FormLabel';
import type { InputProps } from './Input';

type OmittedProps = Omit<
  InputProps,
  | 'className'
  | 'type'
  | 'checked'
  | 'placeholder'
  | 'autoComplete'
  | 'min'
  | 'max'
  | 'maxLength'
  | 'multiple'
  | 'ref'
>;
type TextareaProps = OmittedProps & {
  ref?: refTextareaType;
  rows?: number;
};

const Textarea = ({
  value,
  id,
  name,
  inputHasNoLabel,
  required,
  labelText,
  onChange,
  errorText,
  rows = 3,
  ref,
}: TextareaProps) => {
  const ariaErrorId = `${id}-error`;
  return (
    <div className="input-container">
      <FormLabel
        errorText={errorText}
        required={required}
        labelText={labelText}
        id={id}
        inputHasNoLabel={inputHasNoLabel}
        ariaErrorId={ariaErrorId}
      />

      <textarea
        aria-errormessage={errorText ? ariaErrorId : undefined}
        name={name}
        ref={ref}
        id={id}
        value={value}
        onChange={onChange}
        aria-invalid={errorText ? true : undefined}
        rows={rows}
      />
    </div>
  );
};

export default Textarea;
