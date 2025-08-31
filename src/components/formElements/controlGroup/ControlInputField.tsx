import useLanguage from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import type { ChangeInputType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import IconContent from '../../IconContent';
import { ProductLabelVariant } from '../../productLists/ProductListItem';

type InputType = 'checkbox' | 'radio';

type ControlInputFieldProps = {
  checked: boolean;
  id: string;
  label: string;
  name: string;
  value: string;
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  fill?: string;
  iconName?: IconName;
  iconSize?: string;
  type?: InputType;
  variant?: ProductLabelVariant;
  onChange: (event: ChangeInputType) => void;
};

const ControlInputField = ({
  id,
  name,
  label,
  checked,
  disabled,
  type = 'checkbox',
  onChange,
  iconName,
  autoFocus,
  variant,
  className = '',
  fill,
  iconSize,
}: ControlInputFieldProps) => {
  const { language } = useLanguage();

  return (
    <li className="control-item">
      <label
        htmlFor={id}
        className={`control-label ${variant}-item ${disabled ? 'unavailable' : ''}`}
      >
        {iconName ? (
          <IconContent
            iconName={iconName}
            fill={fill}
            size={iconSize}
            title=""
            ariaLabel={getlowerCaseFirstLetter(label, language)}
            className={className}
          />
        ) : (
          label
        )}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={label}
        checked={checked}
        onChange={onChange}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        autoFocus={autoFocus}
      />
    </li>
  );
};

export default ControlInputField;
