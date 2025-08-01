import OptionGroupTitle from '../../productLists/OptionGroupTitle';
import { BaseCheckboxList } from './CheckboxList';
import ControlInputField from './ControlInputField';

type RadioBtnListProps = BaseCheckboxList & {
  initialChecked: string;
};

const RadioBtnList = ({
  initialChecked,
  onChange,
  groupTitle,
  name,
  disabledList,
  required,
  options,
}: RadioBtnListProps) => (
  <section>
    {groupTitle && (
      <OptionGroupTitle groupTitle={groupTitle} required={required} />
    )}
    <ul className="control-list">
      {options.map((label, index) => {
        const id = `radio-${index}`;
        return (
          <ControlInputField
            key={label}
            type="radio"
            name={name}
            id={id}
            value={label}
            checked={initialChecked === label}
            onChange={onChange}
            disabled={disabledList ? !disabledList.includes(label) : undefined}
            label={label}
          />
        );
      })}
    </ul>
  </section>
);

export default RadioBtnList;
