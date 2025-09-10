import { ReactNode } from 'react';
import { IconName } from '../../types/enums';
import { ChangeInputType, ControlInputType } from '../../types/types';
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
  hideLabel?: boolean;
  iconClassName?: string;
  iconName?: IconName;
  language?: Record<string, string>;
  renderExtra?: ReactNode;
  type?: ControlInputType;
  onChange: (event: ChangeInputType) => void;
};

const Control = ({
  onChange,
  checked,
  name,
  id,
  value,
  label,
  hideLabel,
  renderExtra,
  autoFocus,
  iconName,
  ariaLabel,
  disabled,
  iconClassName,
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
      {!hideLabel && label}
      {renderExtra}

      {iconName && (
        <IconContent
          iconName={iconName}
          title=""
          ariaLabel={ariaLabel || ''}
          className={iconClassName}
        />
      )}
    </label>
  </>
);

export default Control;
