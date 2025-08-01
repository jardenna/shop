import ControlGroup, { BaseControlGroupProps } from './ControlGroup';

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
  <ControlGroup
    name={name}
    options={options}
    values={values}
    onChange={onChange}
    inputInfo={inputInfo}
    required={required}
    groupTitle={groupTitle}
  />
);

export default CheckboxControls;
