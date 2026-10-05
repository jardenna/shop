import { useLanguage } from '../../../features/language/useLanguage';
import { OptionType } from '../../../types/types';
import { translateKey } from '../../../utils/utils';
import ControlInput, { BaseControlProps } from '../ControlInput';
import './_radio-button-list.scss';

interface RadioButtonListProps extends BaseControlProps {
  radioButtonList: OptionType[];
  value: string;
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
        <li key={radio.id ?? radio.value} className="radio-button-item">
          <ControlInput
            type="radio"
            name={name}
            id={radio.id ?? radio.value}
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
