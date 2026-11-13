import type { ReactNode } from 'react';
import { IconName } from '../../types/enums';
import type { ControlInputType, InputChangeHandler } from '../../types/types';
import IconContent from '../IconContent';

export interface BaseControlInputProps {
  name: string;
  onChange: InputChangeHandler;
  autoFocus?: boolean;
}

interface ControlInputProps extends BaseControlInputProps {
  checked: boolean;
  id: string;
  label: string;
  value: string;
  ariaLabel?: string;
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  iconClassName?: string;
  iconName?: IconName;
  renderExtra?: ReactNode;
  showControlInfo?: boolean;
  type?: ControlInputType;
}

const ControlInput = ({
  onChange,
  checked,
  showControlInfo,
  name,
  id,
  value,
  label,
  renderExtra,
  autoFocus,
  iconName,
  ariaLabel,
  disabled,
  iconClassName,
  className = '',
  type = 'checkbox',
}: ControlInputProps) => (
  <>
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      autoFocus={autoFocus}
    />
    <label htmlFor={id} className={`check-box-label ${className}`}>
      {iconName ? (
        <>
          {showControlInfo && <span>{label}</span>}
          <IconContent
            iconName={iconName}
            ariaLabel={ariaLabel}
            className={iconClassName}
          />
        </>
      ) : (
        <span>{label}</span>
      )}
      {renderExtra}
    </label>
  </>
);

export default ControlInput;
