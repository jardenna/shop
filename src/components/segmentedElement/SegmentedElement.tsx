import { useLanguage } from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import { InputChangeHandler, OptionType } from '../../types/types';
import { translateKey } from '../../utils/utils';
import './_segmented-element.scss';
import SegmentedInput from './SegmentedInput';

interface SegmentedElementProps {
  checked: string;
  name: string;
  onChange: InputChangeHandler;
  radioButtonList: OptionType[];
  className?: string;
  iconName?: IconName;
}

const SegmentedElement = ({
  checked,
  radioButtonList,
  onChange,
  name,
  iconName,
  className = '',
}: SegmentedElementProps) => {
  const { language } = useLanguage();

  return (
    <ul className={`segmented-element-list ${className}`}>
      {radioButtonList.map((radio) => (
        <li key={radio.value} className="segmented-element-item">
          <SegmentedInput
            id={radio.id}
            name={name}
            value={radio.value}
            checked={checked === radio.value}
            onChange={onChange}
            label={translateKey(radio.label, language)}
            ariaLabel={translateKey(radio.label, language)}
            iconName={iconName}
            className="tab-item-trigger"
          />
        </li>
      ))}
    </ul>
  );
};

export default SegmentedElement;
