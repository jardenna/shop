import type { ReactNode } from 'react';
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
  ariaLabel?: string;
  className?: string;
  iconClassName?: string;
  iconName?: IconName;
  renderExtra?: ReactNode;
}

const SegmentedInput = ({
  onChange,
  checked,
  name,
  id,
  value,
  label,
  renderExtra,
  iconName,
  ariaLabel,
  iconClassName,
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
      {iconName ? (
        <IconContent
          iconName={iconName}
          ariaLabel={ariaLabel || ''}
          className={iconClassName}
        />
      ) : (
        <span>{label}</span>
      )}
      {renderExtra}
    </label>
  </>
);

export default SegmentedInput;
