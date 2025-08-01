import { ChangeInputType, OptionGroupHeading } from '../../../types/types';
import OptionGroupTitle from '../../productLists/OptionGroupTitle';
import InputInfo from '../InputInfo';
import './_checkbox-list.scss';
import ControlInputField from './ControlInputField';

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
  disabledList,
}: CheckboxListProps) => (
  <section>
    {groupTitle && (
      <OptionGroupTitle groupTitle={groupTitle} required={required} />
    )}
    <ul className="control-list">
      {options.map((label, index) => {
        const id = `checkbox-${index}`;
        return (
          <ControlInputField
            key={label}
            type="checkbox"
            id={id}
            name={name}
            value={label}
            checked={values.includes(label)}
            disabled={disabledList ? !disabledList.includes(label) : undefined}
            onChange={onChange}
            label={label}
          />
        );
      })}
    </ul>
    {inputInfo && <InputInfo inputInfo={inputInfo} />}
  </section>
);

export default CheckboxList;
