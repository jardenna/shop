import ControlList, { BaseControlGroupProps } from './ControlList';

type RadioControlsProps = BaseControlGroupProps & {
  initialChecked: string;
};

const RadioControls = ({
  initialChecked,
  onChange,
  groupTitle,
  name,
  disabledList,
  required,
  options,
  iconName,
}: RadioControlsProps) => (
  <ControlList
    type="radio"
    iconName={iconName}
    name={name}
    options={options}
    groupTitle={groupTitle}
    required={required}
    initialChecked={initialChecked}
    disabledList={disabledList}
    onChange={onChange}
  />
);

export default RadioControls;
