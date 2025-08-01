import ControlGroup, { BaseControlGroupProps } from './ControlGroup';

type RadioBtnListProps = BaseControlGroupProps & {
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
