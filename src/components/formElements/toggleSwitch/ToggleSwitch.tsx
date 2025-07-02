import useLanguage from '../../../features/language/useLanguage';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import './_toggle-switch.scss';

type ToggleSwitchProps = {
  checked: boolean;
  id: string;
  labelText: string;
  onChange: () => void;
};

const ToggleSwitch = ({
  onChange,
  id,
  checked,
  labelText,
}: ToggleSwitchProps) => {
  const { language } = useLanguage();

  return (
    <div className="toggle-switch-list">
      <div className="toggle-switch-item">
        <label htmlFor={id}>
          <span>{getlowerCaseFirstLetter(labelText, language)}</span>
        </label>
        <input
          type="checkbox"
          id={id}
          className="toggle-switch-input visually-hidden"
          onChange={onChange}
          checked={checked}
        />
      </div>
    </div>
  );
};
export default ToggleSwitch;
