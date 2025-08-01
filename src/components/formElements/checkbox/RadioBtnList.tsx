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
            id={id}
            type="radio"
            name={name}
            value={label}
            checked={initialChecked === label}
            disabled={disabledList ? !disabledList.includes(label) : undefined}
            onChange={onChange}
            label={label}
          />
        );
      })}
    </ul>
  </section>
);

export default RadioBtnList;
