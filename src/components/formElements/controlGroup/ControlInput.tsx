import useLanguage from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import type {
  ControlInputType,
  InputChangeHandler,
} from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import IconContent from '../../IconContent';
import { ProductLabelVariant } from '../../productLists/ProductListItem';
import VisuallyHidden from '../../VisuallyHidden';

type ControlInputProps = {
  checked: boolean;
  id: string;
  label: string;
  name: string;
  onChange: InputChangeHandler;
  value: string;
  ariaLabel?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  fill?: string;
  iconClassName?: string;
  iconName?: IconName;
  iconSize?: string;
  type?: ControlInputType;
  variant?: ProductLabelVariant;
};

const ControlInput = ({
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
  iconClassName,
  fill,
  ariaLabel,
  iconSize,
}: ControlInputProps) => {
  const { language } = useLanguage();

  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        value={label}
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
            title=""
            ariaLabel={ariaLabel || getlowerCaseFirstLetter(label, language)}
            className={iconClassName}
          />
        ) : (
          <span>
            {label} {ariaLabel && <VisuallyHidden>{ariaLabel}</VisuallyHidden>}
          </span>
        )}
      </label>
    </>
  );
};

export default ControlInput;
