import { useLanguage } from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import type { OptionType } from '../../../types/types';
import { translateKey } from '../../../utils/utils';
import ControlInput, { BaseControlInputProps } from '../ControlInput';
import './_radio-tile-list.scss';

interface RadioTileListProps extends BaseControlInputProps {
  checked: string;
  radioButtonList: OptionType[];
  className?: string;
  iconName?: IconName;
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
            id={radio.id}
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
