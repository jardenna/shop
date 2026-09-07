import { useLanguage } from '../../../features/language/useLanguage';
import { InputChangeHandler, OptionType } from '../../../types/types';
import { translateKey } from '../../../utils/utils';
import ControlInput from '../ControlInput';
import './_radio-button-list.scss';

interface RadioButtonListProps {
  name: string;
  onChange: InputChangeHandler;
  radioButtonList: OptionType[];
  value: string;
  autoFocus?: boolean;
}

const RadioButtonList = ({
  radioButtonList,
  value,
  onChange,
  name,
  autoFocus,
}: RadioButtonListProps) => {
  const { language } = useLanguage();

  return (
    <ul className="radio-button-list">
      {radioButtonList.map((radio) => (
        <li key={radio.label} className="radio-button-list-container">
          <ControlInput
            type="radio"
            name={name}
            id={radio.label}
            value={radio.value}
            checked={value === radio.value}
            onChange={onChange}
            label={translateKey(radio.label, language)}
            autoFocus={autoFocus}
          />
        </li>
      ))}
    </ul>
  );
};

export default RadioButtonList;
