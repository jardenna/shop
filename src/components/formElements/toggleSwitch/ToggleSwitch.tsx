import { OptionType } from '../../../types/types';
import './_toggle-switch.scss';

type ToggleSwitchProps = {
  list: OptionType[];
};

// text={language.showPrice}
const ToggleSwitch = ({ list }: ToggleSwitchProps) => (
  <ul className="toggle-switch-list">
    {list.map((item) => (
      <li className="toggle-switch-item" key={item.label}>
        <label
          htmlFor={item.label}
          className="toggle-switch-label"
          aria-label={item.label}
        >
          <span className="toggle-switch-text">{item.label}</span>
        </label>
        <input
          type="checkbox"
          id={item.label}
          className="toggle-switch-input"
          name={item.label}
        />
      </li>
    ))}
  </ul>
);

export default ToggleSwitch;
