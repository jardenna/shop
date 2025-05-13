import useLanguage from '../../../features/language/useLanguage';
import { ChangeInputType1, OptionType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import './_toggle-switch.scss';

type ToggleSwitchProps = {
  name: string;
  toggleSwitchList: OptionType[];
  values: string[];
  onChange: (event: ChangeInputType1) => void;
};

const ToggleSwitch = ({
  toggleSwitchList,
  onChange,
  name,
  values,
}: ToggleSwitchProps) => {
  const { language } = useLanguage();

  return (
    <ul className="toggle-switch-list">
      {toggleSwitchList.map((toggleSwitch) => (
        <li className="toggle-switch-item" key={toggleSwitch.label}>
          <label
            htmlFor={toggleSwitch.label}
            className="toggle-switch-label"
            aria-label={getlowerCaseFirstLetter(toggleSwitch.label, language)}
          >
            <span className="toggle-switch-text">
              {getlowerCaseFirstLetter(toggleSwitch.label, language)}
            </span>
          </label>
          <input
            type="checkbox"
            name={name}
            id={toggleSwitch.label}
            className="toggle-switch-input visually-hidden"
            onChange={onChange}
            checked={values.includes(toggleSwitch.value)}
            value={toggleSwitch.value}
          />
        </li>
      ))}
    </ul>
  );
};
export default ToggleSwitch;
