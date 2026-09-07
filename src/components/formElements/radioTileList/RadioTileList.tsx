import { useLanguage } from '../../../features/language/useLanguage';
import type { OptionType } from '../../../types/types';
import { translateKey } from '../../../utils/utils';
import type { BaseControlProps } from '../ControlInput';
import ControlInput from '../ControlInput';
import './_radio-tile-list.scss';

interface RadioTileListProps extends BaseControlProps {
  checked: string;
  radioButtonList: OptionType[];
}

const RadioTileList = ({
  checked,
  radioButtonList,
  onChange,
  name,
  autoFocus,
  iconName,
  className = '',
}: RadioTileListProps) => {
  const { language } = useLanguage();

  return (
    <ul className={`control-list radio-tile-list ${className}`}>
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
