import { useLanguage } from '../../../features/language/useLanguage';
import OptionGroupTitle from '../../../features/shop/components/productLists/OptionGroupTitle';
import type { ProductLabelVariant } from '../../../features/shop/components/productLists/ProductListItem';
import { IconName } from '../../../types/enums';
import type {
  ControlInputType,
  InputChangeHandler,
  OptionGroupHeading,
} from '../../../types/types';
import { colorMap } from '../../../utils/colorUtils';
import { translateKey } from '../../../utils/utils';
import InputInfo from '../InputInfo';
import ControlGroupInput from './ProductOptionInput';

export interface BaseControlGroupProps {
  groupTitle: OptionGroupHeading;
  name: string;
  onChange: InputChangeHandler;
  type: ControlInputType;
  autoFocus?: boolean;
  className?: string;
  iconClassName?: string;
  iconName?: IconName;
  iconSize?: string;
  inputInfo?: string;
  required?: boolean;
  variant?: ProductLabelVariant;
}

interface ProductOptionListProps extends BaseControlGroupProps {
  options: string[];
  disabledList?: string[];
  initialChecked?: string;
  values?: string[];
}

const ProductOptionList = ({
  name,
  options,
  groupTitle,
  required,
  inputInfo,
  values = [],
  initialChecked,
  disabledList,
  onChange,
  iconName,
  className = 'size-list',
  autoFocus,
  variant = 'medium',
  iconSize,
  type,
  iconClassName,
}: ProductOptionListProps) => {
  const { language } = useLanguage();
  const checked = (label: string) =>
    type === 'checkbox' ? values.includes(label) : initialChecked === label;

  return (
    <div>
      <OptionGroupTitle groupTitle={groupTitle} required={required} />

      <ul
        className={`control-list ${className}`}
        aria-labelledby={groupTitle.id}
      >
        {options.map((label, index) => (
          <li key={label} className="control-item">
            <ControlGroupInput
              iconSize={iconSize}
              autoFocus={autoFocus && index === 0}
              iconName={iconName}
              fill={iconName ? colorMap[label] : ''}
              id={`${name}-${index}`}
              type={type}
              name={name}
              value={label}
              checked={checked(label)}
              ariaLabel={translateKey(label, language)}
              disabled={
                disabledList ? !disabledList.includes(label) : undefined
              }
              onChange={onChange}
              label={label}
              variant={variant}
              iconClassName={iconClassName}
              groupTitle={{
                id: '',
                title: '',
                errorText: undefined,
              }}
            />
          </li>
        ))}
      </ul>
      {inputInfo && <InputInfo inputInfo={inputInfo} />}
    </div>
  );
};

export default ProductOptionList;
