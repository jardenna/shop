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
  className,
  autoFocus,
  variant,
}: RadioControlsProps) => (
  <ControlList
    autoFocus={autoFocus}
    type="radio"
    variant={variant}
    iconName={iconName}
    name={name}
    options={options}
    groupTitle={groupTitle}
    required={required}
    initialChecked={initialChecked}
    disabledList={disabledList}
    onChange={onChange}
    className={className}
  />
);

export default RadioControls;
