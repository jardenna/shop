import { ChangeInputType } from '../../../types/types';
import './_toggle-switch.scss';

interface ToggleSwitchProps {
  checked: boolean;
  id: string;
  labelText: string;
  name: string;
  onChange: (event: ChangeInputType) => void;
}

const ToggleSwitch = ({
  onChange,
  id,
  name,
  checked,
  labelText,
}: ToggleSwitchProps) => (
  <div className="toggle-switch-container">
    <div className="toggle-switch-item">
      <label htmlFor={id} className="switch">
        <span>{labelText}</span>
      </label>
      <input
        type="checkbox"
        id={id}
        name={name}
        className="visually-hidden"
        onChange={onChange}
        checked={checked}
        role="switch"
      />
    </div>
  </div>
);

export default ToggleSwitch;
