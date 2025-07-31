import { ChangeInputType, OptionGroupHeading } from '../../../types/types';
import OptionGroupTitle from '../../productLists/OptionGroupTitle';
import InputInfo from '../InputInfo';
import './_checkbox-list.scss';
import ControlInputField from './ControlInputField';

type CheckboxListProps = {
  name: string;
  options: string[];
  values: string[];
  disabled?: boolean;
  groupTitle?: OptionGroupHeading;
  inputInfo?: string;
  required?: boolean;
  onChange: (event: ChangeInputType) => void;
};

const CheckboxList = ({
  options,
  values,
  onChange,
  name,
  disabled,
  groupTitle,
  required,
  inputInfo,
}: CheckboxListProps) => (
  <section>
    {groupTitle && (
      <OptionGroupTitle groupTitle={groupTitle} required={required} />
    )}
    <ul className="checkbox-list">
      {options.map((label, index) => {
        const id = `input-${index}`;
        return (
          <ControlInputField
            key={label}
            type="checkbox"
            id={id}
            name={name}
            value={label}
            checked={values.includes(label)}
            onChange={onChange}
            disabled={disabled}
            label={label}
          />
        );
      })}
    </ul>
    {inputInfo && <InputInfo inputInfo={inputInfo} />}
  </section>
);

export default CheckboxList;
