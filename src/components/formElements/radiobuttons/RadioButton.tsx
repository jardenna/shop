import useLanguage from '../../../features/language/useLanguage';
import type { ChangeInputType, OptionType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import './_radio-button.scss';

type RadioButtonProps = {
  initialChecked: string;
  name: string;
  radioButtonList: OptionType[];
  autoFocus?: boolean;
  onChange: (event: ChangeInputType) => void;
};

const RadioButton = ({
  initialChecked,
  radioButtonList,
  onChange,
  name,
  autoFocus,
}: RadioButtonProps) => {
  const { language } = useLanguage();

  return (
    <ul className="radio-btn-container">
      {radioButtonList.map((radio, index) => (
        <li key={radio.value} className="radio-btn-content">
          <input
            autoFocus={autoFocus && index === 0}
            type="radio"
            id={radio.label}
            name={name}
            value={radio.value}
            checked={initialChecked === radio.value}
            onChange={onChange}
          />
          <label htmlFor={radio.label} className="radio-btn-label">
            {getlowerCaseFirstLetter(radio.label, language)}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default RadioButton;
