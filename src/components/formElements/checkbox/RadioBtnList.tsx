import { BaseCheckboxList } from './CheckboxList';
import ControlGroup from './ControlGroup';

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
  <ControlGroup
    type="radio"
    name={name}
    options={options}
    groupTitle={groupTitle}
    required={required}
    initialChecked={initialChecked}
    disabledList={disabledList}
    onChange={onChange}
  />
);

export default RadioBtnList;
