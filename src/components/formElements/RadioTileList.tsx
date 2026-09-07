import { useLanguage } from '../../features/language/useLanguage';
import type { OptionType } from '../../types/types';
import { translateKey } from '../../utils/utils';
import type { BaseControlProps } from './ControlInput';
import ControlInput from './ControlInput';

interface RadioTileListProps extends BaseControlProps {
  checked: string;
  radioButtonList: OptionType[];
  variant?: 'primary' | 'secondary';
}

const RadioTileList = ({
  checked,
  radioButtonList,
  onChange,
  name,
  autoFocus,
  iconName,
  className = '',
  variant = 'primary',
}: RadioTileListProps) => {
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
            checked={checked === radio.value}
            onChange={onChange}
            label={translateKey(radio.label, language)}
            autoFocus={autoFocus && checked === radio.value}
            ariaLabel={translateKey(radio.label, language)}
            className="control-label"
            iconName={iconName}
            iconClassName={
              Number(radio.value) <= Number(checked) ? 'filled' : ''
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default RadioTileList;
