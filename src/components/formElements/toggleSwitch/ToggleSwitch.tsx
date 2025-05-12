import './_toggle-switch.scss';

type ToggleSwitchProps = {
  id: string;
  text: string;
};

const ToggleSwitch = ({ text, id }: ToggleSwitchProps) => (
  <div className="toggle">
    <input type="checkbox" id={id} className="toggle-input" />

    <label htmlFor={id} className="toggle-label" aria-label={text} />
  </div>
);

export default ToggleSwitch;
