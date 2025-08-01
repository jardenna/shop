import { ChangeInputType, OptionGroupHeading } from '../../../types/types';
import ControlList from './ControlList';

export type BaseControlGroupProps = {
  name: string;
  options: string[];
  disabledList?: string[];
  groupTitle?: OptionGroupHeading;
  inputInfo?: string;
  required?: boolean;
  onChange: (event: ChangeInputType) => void;
};

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
  />
);

export default CheckboxControls;
