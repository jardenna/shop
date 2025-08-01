import { ChangeInputType } from '../../../types/types';

type InputType = 'checkbox' | 'radio';

type ControlInputFieldProps = {
  checked: boolean;
  id: string;
  label: string;
  name: string;
  value: string;
  disabled?: boolean;
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
}: ControlInputFieldProps) => (
  <li className="control-item">
    <label htmlFor={id}>{label}</label>
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
