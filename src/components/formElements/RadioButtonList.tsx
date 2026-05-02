import { useLanguage } from '../../features/language/useLanguage';
import type { OptionType } from '../../types/types';
import { translateKey } from '../../utils/utils';
import type { BaseControlProps } from './ControlInput';
import ControlInput from './ControlInput';

type RadioButtonListProps = BaseControlProps & {
  initialChecked: string;
  radioButtonList: OptionType[];
  variant?: 'primary' | 'secondary';
};

const RadioButtonList = ({
  initialChecked,
  radioButtonList,
  onChange,
  name,
  autoFocus,
  iconName,
  className = '',
  variant = 'primary',
}: RadioButtonListProps) => {
  const { language } = useLanguage();

  return (
    <ul className={`control-list ${className} ${variant}`}>
      {radioButtonList.map((radio) => (
        <li key={radio.value} className="control-item">
          <ControlInput
            type="radio"
            id={radio.label}
            name={name}
            value={radio.value}
            checked={initialChecked === radio.value}
            onChange={onChange}
            label={translateKey(radio.label, language)}
            autoFocus={autoFocus && initialChecked === radio.value}
            ariaLabel={translateKey(radio.label, language)}
            className="control-label"
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
