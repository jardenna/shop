import { useLanguage } from '../../features/language/useLanguage';
import type {
  IconNameValue,
  InputChangeHandler,
  OptionType,
} from '../../shared/types';
import { translateKey } from '../../utils/utils';
import './_segmented-element.scss';
import SegmentedInput from './SegmentedInput';

interface RadioButtonListProps extends OptionType {
  iconName?: IconNameValue;
}

interface SegmentedElementProps {
  checked: string;
  name: string;
  onChange: InputChangeHandler;
  radioButtonList: RadioButtonListProps[];
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
      {radioButtonList.map(({ id, value, iconName, label }) => (
        <li key={value} className="segmented-element-item">
          <SegmentedInput
            id={id}
            name={name}
            value={value}
            checked={checked === value}
            onChange={onChange}
            label={translateKey(label, language)}
            className="segmented-item-trigger"
            iconName={iconName}
          />
        </li>
      ))}
    </ul>
  );
};

export default SegmentedElement;
