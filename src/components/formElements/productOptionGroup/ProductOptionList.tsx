import { useLanguage } from '../../../features/language/useLanguage';
import { colorMap } from '../../../utils/colorUtils';
import { translateKey } from '../../../utils/utils';
import './_product-option-list.scss';
import { BaseProductOptionProps } from './ProductOptionGroup';
import ProductOptionInput from './ProductOptionInput';

interface ProductOptionListProps extends BaseProductOptionProps {
  options: string[];
  className?: string;
  disabledList?: string[];
  checked: (value: string) => boolean;
}

const ProductOptionList = ({
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
}: ProductOptionListProps) => {
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

export default ProductOptionList;
