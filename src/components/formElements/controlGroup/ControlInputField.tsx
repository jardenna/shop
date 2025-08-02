import useLanguage from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import type { ChangeInputType } from '../../../types/types';
import { colorMap } from '../../../utils/colorUtils';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import IconContent from '../../IconContent';

type InputType = 'checkbox' | 'radio';

type ControlInputFieldProps = {
  checked: boolean;
  id: string;
  label: string;
  name: string;
  value: string;
  disabled?: boolean;
  iconName?: IconName;
  type?: InputType;
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
}: ControlInputFieldProps) => {
  const { language } = useLanguage();

  return (
    <li className="control-item">
      <label htmlFor={id} className="control-label">
        {iconName ? (
          <IconContent
            iconName={iconName}
            fill={colorMap[label]}
            size="70"
            title=""
            ariaLabel={getlowerCaseFirstLetter(label, language)}
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
        disabled={disabled}
      />
    </li>
  );
};

export default ControlInputField;
