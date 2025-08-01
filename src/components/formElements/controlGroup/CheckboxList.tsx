import ControlGroup, { BaseControlGroupProps } from './ControlGroup';

type CheckboxListProps = BaseControlGroupProps & {
  values: string[];
};

const CheckboxList = ({
  options,
  values,
  onChange,
  name,
  groupTitle,
  required,
  inputInfo,
}: CheckboxListProps) => (
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

export default CheckboxList;
