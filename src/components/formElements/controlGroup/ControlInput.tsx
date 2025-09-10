import useLanguage from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import type { ChangeInputType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import IconContent from '../../IconContent';
import { ProductLabelVariant } from '../../productLists/ProductListItem';
import VisuallyHidden from '../../VisuallyHidden';

type InputType = 'checkbox' | 'radio';

type ControlInputProps = {
  checked: boolean;
  id: string;
  label: string;
  name: string;
  value: string;
  ariaLabel?: string;
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
  className = '',
  fill,
  ariaLabel,
  iconSize,
}: ControlInputProps) => {
  const { language } = useLanguage();

  return (
    <>
      <input
        type={type}
        id={id}
        name={name}
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
            className={className}
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
