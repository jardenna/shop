import { IconName } from '../../types/enums';
import type { InputChangeHandler } from '../../types/types';
import IconContent from '../IconContent';

interface SegmentedInputProps {
  checked: boolean;
  id: string;
  label: string;
  name: string;
  onChange: InputChangeHandler;
  value: string;
  className?: string;
  iconName?: IconName;
}

const SegmentedInput = ({
  onChange,
  checked,
  name,
  id,
  value,
  label,
  className = '',
  iconName,
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
      {iconName ? (
        <IconContent iconName={iconName} ariaLabel={label} />
      ) : (
        <span>{label}</span>
      )}
    </label>
  </>
);

export default SegmentedInput;
