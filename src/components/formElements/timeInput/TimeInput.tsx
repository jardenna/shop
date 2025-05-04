import { ChangeInputType } from '../../../types/types';
import FormLabel from '../FormLabel';
import './_time-input.scss';

type TimeInputProps = {
  id: string;
  labelText: string;
  name: string;
  value: string;
  className?: string;
  errorText?: string;
  inputHasNoLabel?: boolean;
  max?: number;
  min?: number;
  required?: boolean;
  onChange: (event: ChangeInputType) => void;
};

const TimeInput = ({
  id,
  labelText,
  name,
  className = '',
  inputHasNoLabel,
  onChange,
  value,
  min,
  max,
  errorText,
  required,
}: TimeInputProps) => (
  <div className={`input-container ${className}`}>
    <FormLabel
      errorText={errorText}
      required={required}
      labelText={labelText}
      id={id}
      inputHasNoLabel={inputHasNoLabel}
    />

    <input
      type="time"
      name={name}
      onChange={onChange}
      className={className}
      value={value}
      id={id}
      min={min}
      max={max}
    />
  </div>
);

export default TimeInput;
