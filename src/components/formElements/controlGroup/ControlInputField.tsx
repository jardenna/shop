import { IconName } from '../../../types/enums';
import type { ChangeInputType } from '../../../types/types';
import { colorMap } from '../../../utils/colorUtils';
import { resolveIconName } from '../../../utils/iconHelpers';
import IconContent from '../../IconContent';

type InputType = 'checkbox' | 'radio';

type ControlInputFieldProps = {
  checked: boolean;
  id: string;
  label: string;
  name: string;
  value: string;
  disabled?: boolean;
  icon?: IconName;
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
  icon,
}: ControlInputFieldProps) => (
  <li className="control-item">
    <label htmlFor={id}>
      {icon ? (
        <IconContent
          iconName={resolveIconName(icon)}
          fill={colorMap[label]}
          size="70"
          title=""
          ariaLabel={resolveIconName(icon)}
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

export default ControlInputField;
