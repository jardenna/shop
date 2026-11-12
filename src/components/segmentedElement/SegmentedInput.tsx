import type { InputChangeHandler } from '../../types/types';

interface SegmentedInputProps {
  checked: boolean;
  id: string;
  label: string;
  name: string;
  onChange: InputChangeHandler;
  value: string;
  className?: string;
}

const SegmentedInput = ({
  onChange,
  checked,
  name,
  id,
  value,
  label,
  className = '',
}: SegmentedInputProps) => (
  <>
    <input
      type="radio"
      name={name}
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={id} className={className}>
      <span>{label}</span>
    </label>
  </>
);

export default SegmentedInput;
