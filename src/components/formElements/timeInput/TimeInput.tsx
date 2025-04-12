import { ChangeInputType } from '../../../types/types';
import FormLabel from '../FormLabel';
import './_time-input.scss';

type TimeInputProps = {
  id: string;
  labelText: string;
  name: string;
  value: string;
  className?: string;
  inputHasNoLabel?: boolean;
  max?: number;
  min?: number;
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
}: TimeInputProps) => (
  <div className={`input-container ${className}`}>
    <span className={inputHasNoLabel ? '' : 'form-label-container'}>
      <FormLabel
        inputLabel={labelText}
        id={id}
        inputHasNoLabel={inputHasNoLabel}
      />
    </span>
    <span className="hide-time-icon" aria-hidden={true} />

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
