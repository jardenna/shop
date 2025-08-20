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
  autoFocus,
}: CheckboxControlsProps) => (
  <ControlList
    name={name}
    options={options}
    values={values}
    autoFocus={autoFocus}
    onChange={onChange}
    inputInfo={inputInfo}
    required={required}
    groupTitle={groupTitle}
    className="size-list"
  />
);

export default CheckboxControls;
