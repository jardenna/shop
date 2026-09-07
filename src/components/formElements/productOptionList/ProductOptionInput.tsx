import IconContent from '../../IconContent';
import type { BaseControlGroupProps } from './ProductOptionList';

type ProductOptionInputProps = BaseControlGroupProps & {
  ariaLabel: string;
  checked: boolean;
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
  fill?: string;
};

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
