import { useLanguage } from '../../features/language/useLanguage';
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
}

const SegmentedElement = ({
  checked,
  radioButtonList,
  onChange,
  name,
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
            className="tab-item-trigger"
          />
        </li>
      ))}
    </ul>
  );
};

export default SegmentedElement;
