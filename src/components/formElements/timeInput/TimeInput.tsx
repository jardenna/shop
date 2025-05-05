import { ChangeInputType } from '../../../types/types';
import Input from '../Input';

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
  <Input
    type="time"
    name={name}
    onChange={onChange}
    className={className}
    value={value}
    id={id}
    min={min}
    max={max}
    errorText={errorText}
    required={required}
    labelText={labelText}
    inputHasNoLabel={inputHasNoLabel}
  />
);

export default TimeInput;
