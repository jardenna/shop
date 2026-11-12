import { IconName } from '../../../types/enums';
import {
  InputChangeHandler,
  ControlInputType,
  SizeVariant,
} from '../../../types/types';
import IconContent from '../../IconContent';

interface ProductOptionInputProps {
  ariaLabel: string;
  checked: boolean;
  id: string;
  label: string;
  name: string;
  onChange: InputChangeHandler;
  type: ControlInputType;
  value: string;
  autoFocus?: boolean;
  disabled?: boolean;
  fill?: string;
  iconClassName?: string;
  iconName?: IconName;
  iconSize?: string;
  variant?: SizeVariant;
}

const ProductOptionInput = ({
  id,
  name,
  label,
  value,
  checked,
  disabled,
  type,
  onChange,
  iconName,
  autoFocus,
  variant,
  iconClassName,
  fill,
  ariaLabel,
  iconSize,
}: ProductOptionInputProps) => (
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

export default ProductOptionInput;
