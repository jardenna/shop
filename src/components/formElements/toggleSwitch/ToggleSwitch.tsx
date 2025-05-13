import './_toggle-switch.scss';

type ToggleSwitchProps = {
  id: string;
  text: string;
};

const ToggleSwitch = ({ text, id }: ToggleSwitchProps) => (
  <ul className="toggle-switch-list">
    <li className="toggle-switch-item">
      <label htmlFor={id} className="toggle-switch-label" aria-label={text}>
        <span className="toggle-switch-text"> {text}</span>
      </label>
      <input
        type="checkbox"
        id={id}
        className="toggle-switch-input"
        name={id}
      />
    </li>
  </ul>
);

export default ToggleSwitch;
