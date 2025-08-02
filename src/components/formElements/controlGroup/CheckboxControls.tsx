import ControlList, { BaseControlGroupProps } from './ControlList';

type CheckboxControlsProps = BaseControlGroupProps & {
  values: string[];
};

const CheckboxControls = ({
  options,
  values,
  onChange,
  name,
  groupTitle,
  required,
  inputInfo,
}: CheckboxControlsProps) => (
  <ControlList
    name={name}
    options={options}
    values={values}
    onChange={onChange}
    inputInfo={inputInfo}
    required={required}
    groupTitle={groupTitle}
    className="size-list"
  />
);

export default CheckboxControls;
