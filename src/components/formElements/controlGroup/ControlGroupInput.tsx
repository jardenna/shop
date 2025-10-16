import IconContent from '../../IconContent';
import type { BaseControlGroupProps } from './ControlGroupList';

type ControlGroupInputProps = BaseControlGroupProps & {
  ariaLabel: string;
  checked: boolean;
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
  fill?: string;
};

const ControlGroupInput = ({
  id,
  name,
  label,
  value,
  checked,
  disabled,
  type = 'checkbox',
  onChange,
  iconName,
  autoFocus,
  variant,
  iconClassName,
  fill,
  ariaLabel,
  iconSize,
}: ControlGroupInputProps) => (
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
    <label htmlFor={id} className={`control-label ${variant}-item`}>
      {iconName ? (
        <IconContent
          iconName={iconName}
          fill={fill}
          size={iconSize}
          ariaLabel={ariaLabel}
          className={iconClassName}
        />
      ) : (
        <span>{label}</span>
      )}
    </label>
  </>
);

export default ControlGroupInput;
