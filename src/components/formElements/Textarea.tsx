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
  | 'onChange'
>;

type TextareaProps = OmittedProps & {
  ariaHidden?: boolean;
  ref?: refTextareaType;
  rows?: number;
  tabIndex?: number;
  onChange: (event: any) => void;
};

const Textarea = ({
  value,
  tabIndex,
  id,
  name,
  inputHasNoLabel,
  required,
  labelText,
  onChange,
  errorText,
  rows = 3,
  ariaHidden,
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
        tabIndex={tabIndex}
        aria-invalid={errorText ? true : undefined}
        rows={rows}
        aria-hidden={ariaHidden}
      />
    </div>
  );
};

export default Textarea;
