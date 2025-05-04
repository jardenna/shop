import { ChangeInputType } from '../../types/types';
import FormLabel from './FormLabel';
import { InputProps } from './Input';

type OmittedProps = Omit<
  InputProps,
  | 'className'
  | 'type'
  | 'checked'
  | 'placeholder'
  | 'autoComplete'
  | 'onChange'
  | 'min'
  | 'max'
  | 'maxLength'
  | 'multiple'
>;
type TextareaProps = OmittedProps & {
  onChange: (event: ChangeInputType) => void;
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
}: TextareaProps) => (
  <div className="input-container">
    <FormLabel
      errorText={errorText}
      required={required}
      labelText={labelText}
      id={id}
      inputHasNoLabel={inputHasNoLabel}
    />

    <textarea
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      aria-invalid={errorText ? true : undefined}
    />
  </div>
);

export default Textarea;
