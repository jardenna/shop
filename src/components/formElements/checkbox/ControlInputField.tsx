import { ChangeInputType } from '../../../types/types';

type InputType = 'checkbox' | 'radio';

type ControlInputFieldProps = {
  checked: boolean;
  id: string;
  inputType: InputType;
  label: string;
  name: string;
  value: string;
  disabled?: boolean;
  onChange: (event: ChangeInputType) => void;
};

const ControlInputField = ({
  id,
  name,
  label,
  checked,
  disabled,
  inputType,
  onChange,
}: ControlInputFieldProps) => (
  <li className="checkbox-item">
    <label htmlFor={id}>{label}</label>
    <input
      type={inputType}
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
