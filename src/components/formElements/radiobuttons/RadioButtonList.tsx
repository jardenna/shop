import useLanguage from '../../../features/language/useLanguage';
import type { OptionType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import type { BaseControlProps } from '../ControlInput';
import ControlInput from '../ControlInput';
import './_radio-button.scss';

type RadioButtonListProps = BaseControlProps & {
  initialChecked: string;
  radioButtonList: OptionType[];
};

const RadioButtonList = ({
  initialChecked,
  radioButtonList,
  onChange,
  name,
  autoFocus,
  iconName,
  className = '',
}: RadioButtonListProps) => {
  const { language } = useLanguage();

  return (
    <ul className={`radio-btn-container ${className}`}>
      {radioButtonList.map((radio, index) => (
        <li key={radio.value} className="radio-btn-content">
          <ControlInput
            type="radio"
            id={radio.label}
            name={name}
            value={radio.value}
            checked={initialChecked === radio.value}
            onChange={onChange}
            label={getlowerCaseFirstLetter(radio.label, language)}
            autoFocus={autoFocus && index === 0}
            ariaLabel={getlowerCaseFirstLetter(radio.label, language)}
            className="radio-btn-label"
            iconName={iconName}
            iconClassName={
              Number(radio.value) <= Number(initialChecked) ? 'filled' : ''
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default RadioButtonList;
