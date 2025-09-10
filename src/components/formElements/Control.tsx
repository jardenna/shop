import { ReactNode } from 'react';
import { IconName } from '../../types/enums';
import { ChangeInputType, InputType } from '../../types/types';
import IconContent from '../IconContent';

type ControlProps = {
  checked: boolean;
  id: string;
  label: string;
  name: string;
  value: string;
  ariaLabel?: string;
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  iconName?: IconName;
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
  iconName,
  ariaLabel,
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

      {iconName && (
        <IconContent
          iconName={iconName}
          title=""
          size="16"
          ariaLabel={ariaLabel || ''}
        />
      )}
    </label>
  </>
);

export default Control;
