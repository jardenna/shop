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
}: TextareaProps) => (
  <div className="input-container">
    <span className="form-label-container">
      <FormLabel
        required={required}
        inputLabel={labelText}
        id={id}
        inputHasNoLabel={inputHasNoLabel}
      />
    </span>
    <textarea name={name} id={id} value={value} onChange={onChange} />
  </div>
);

export default Textarea;
