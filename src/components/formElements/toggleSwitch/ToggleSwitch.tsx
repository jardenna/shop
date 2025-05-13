import useLanguage from '../../../features/language/useLanguage';
import { OptionType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import './_toggle-switch.scss';

type ToggleSwitchProps = {
  list: OptionType[];
};

// text={language.showPrice}
const ToggleSwitch = ({ list }: ToggleSwitchProps) => {
  const { language } = useLanguage();

  return (
    <ul className="toggle-switch-list">
      {list.map((item) => (
        <li className="toggle-switch-item" key={item.label}>
          <label
            htmlFor={item.label}
            className="toggle-switch-label"
            aria-label={getlowerCaseFirstLetter(item.label, language)}
          >
            <span className="toggle-switch-text">
              {getlowerCaseFirstLetter(item.label, language)}
            </span>
          </label>
          <input
            type="checkbox"
            id={item.label}
            className="toggle-switch-input visually-hidden"
            name={item.label}
          />
        </li>
      ))}
    </ul>
  );
};
export default ToggleSwitch;
