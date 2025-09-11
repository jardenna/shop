import { ReactNode } from 'react';
import { IconName } from '../../types/enums';
import type { ControlInputType, InputChangeHandler } from '../../types/types';
import IconContent from '../IconContent';

export type BaseControlProps = {
  name: string;
  onChange: InputChangeHandler;
  ariaLabel?: string;
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  iconClassName?: string;
  iconName?: IconName;
  language?: Record<string, string>;
  type?: ControlInputType;
};

type ControlInputProps = BaseControlProps & {
  checked: boolean;
  id: string;
  label: string;
  value: string;
  renderExtra?: ReactNode;
};

const ControlInput = ({
  onChange,
  checked,
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
  className = 'checkbox-label',
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
    <label htmlFor={id} className={className}>
      {renderExtra}
      {iconName ? (
        <IconContent
          iconName={iconName}
          title=""
          ariaLabel={ariaLabel || ''}
          className={iconClassName}
        />
      ) : (
        <span>{label}</span>
      )}
    </label>
  </>
);

export default ControlInput;
