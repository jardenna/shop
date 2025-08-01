import { ChangeInputType, OptionGroupHeading } from '../../../types/types';
import ControlGroup from './ControlGroup';

export type BaseCheckboxList = {
  name: string;
  options: string[];
  disabledList?: string[];
  groupTitle?: OptionGroupHeading;
  inputInfo?: string;
  required?: boolean;
  onChange: (event: ChangeInputType) => void;
};

export type CheckboxListProps = BaseCheckboxList & {
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
  <section>
    <ControlGroup
      name={name}
      options={options}
      values={values}
      onChange={onChange}
      inputInfo={inputInfo}
      required={required}
      groupTitle={groupTitle}
    />
  </section>
);

export default CheckboxList;
