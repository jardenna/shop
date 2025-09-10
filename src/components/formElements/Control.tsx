import { ReactNode } from 'react';
import { ChangeInputType, InputType } from '../../types/types';

type ControlProps = {
  checked: boolean;
  id: string;
  label: string;
  name: string;
  value: string;
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  language?: Record<string, string>;
  renderExtra?: ReactNode;
  type?: InputType;
  onChange: (event: ChangeInputType) => void;
};
const Control = ({
  onChange,
  checked,
  name,
  id,
  value,
  label,
  renderExtra,
  autoFocus,
  disabled,
  className = 'checkbox-label',
  type = 'checkbox',
}: ControlProps) => (
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
      {label}
      {renderExtra}
    </label>
  </>
);

export default Control;
