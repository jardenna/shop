import useLanguage from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import type { ChangeInputType, OptionType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import Control from '../Control';
import './_radio-button.scss';

type RadioButtonListProps = {
  initialChecked: string;
  name: string;
  radioButtonList: OptionType[];
  ariaLabel?: string;
  autoFocus?: boolean;
  className?: string;
  hideLabel?: boolean;
  iconName?: IconName;
  onChange: (event: ChangeInputType) => void;
};

const RadioButtonList = ({
  initialChecked,
  radioButtonList,
  onChange,
  name,
  autoFocus,
  iconName,
  className,
  hideLabel,
}: RadioButtonListProps) => {
  const { language } = useLanguage();

  return (
    <ul className={`radio-btn-container ${className}`}>
      {radioButtonList.map((radio, index) => (
        <li key={radio.value} className="radio-btn-content">
          <Control
            type="radio"
            id={radio.label}
            hideLabel={hideLabel}
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
