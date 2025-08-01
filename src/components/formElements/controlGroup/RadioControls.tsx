import ControlGroup, { BaseControlGroupProps } from './ControlGroup';

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

export default RadioControls;
