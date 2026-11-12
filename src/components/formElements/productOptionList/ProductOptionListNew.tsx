import { useLanguage } from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import type {
  ControlInputType,
  InputChangeHandler,
  SizeVariant,
} from '../../../types/types';
import { colorMap } from '../../../utils/colorUtils';
import { translateKey } from '../../../utils/utils';
import './_product-option-list.scss';
import ProductOptionInput from './ProductOptionInput';

interface ProductOptionListNewProps {
  name: string;
  onChange: InputChangeHandler;
  options: string[];
  type: ControlInputType;
  autoFocus?: boolean;
  className?: string;
  disabledList?: string[];
  iconClassName?: string;
  iconName?: IconName;
  iconSize?: string;
  variant?: SizeVariant;
  checked: (value: string) => boolean;
}

const ProductOptionListNew = ({
  name,
  options,
  disabledList,
  onChange,
  iconName,
  className = 'size-list',
  autoFocus,
  variant = 'medium',
  iconSize,
  type,
  checked,
  iconClassName,
}: ProductOptionListNewProps) => {
  const { language } = useLanguage();

  return (
    <ul className={`control-list product-option-list ${className}`}>
      {options.map((value, index) => (
        <li key={value} className="control-item">
          <ProductOptionInput
            iconSize={iconSize}
            autoFocus={autoFocus && index === 0}
            iconName={iconName}
            fill={iconName ? colorMap[value] : ''}
            id={`${name}-${index}`}
            type={type}
            name={name}
            value={value}
            checked={checked(value)}
            ariaLabel={translateKey(value, language)}
            disabled={disabledList ? !disabledList.includes(value) : undefined}
            onChange={onChange}
            label={value}
            variant={variant}
            iconClassName={iconClassName}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductOptionListNew;
