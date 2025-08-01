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
}: RadioControlsProps) => (
  <ControlList
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

export default RadioControls;
