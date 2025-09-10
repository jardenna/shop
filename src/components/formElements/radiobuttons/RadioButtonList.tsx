import useLanguage from '../../../features/language/useLanguage';
import type { ChangeInputType, OptionType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import Control from '../checkbox/Control';
import './_radio-button.scss';

type RadioButtonListProps = {
  initialChecked: string;
  name: string;
  radioButtonList: OptionType[];
  autoFocus?: boolean;
  onChange: (event: ChangeInputType) => void;
};

const RadioButtonList = ({
  initialChecked,
  radioButtonList,
  onChange,
  name,
  autoFocus,
}: RadioButtonListProps) => {
  const { language } = useLanguage();

  return (
    <ul className="radio-btn-container">
      {radioButtonList.map((radio, index) => (
        <li key={radio.value} className="radio-btn-content">
          <Control
            type="radio"
            id={radio.label}
            name={name}
            value={radio.value}
            checked={initialChecked === radio.value}
            onChange={onChange}
            label={getlowerCaseFirstLetter(radio.label, language)}
            autoFocus={autoFocus && index === 0}
            className="radio-btn-label"
          />
        </li>
      ))}
    </ul>
  );
};

export default RadioButtonList;
