import { ChangeInputType, OptionGroupHeading } from '../../../types/types';
import OptionGroupTitle from '../../productLists/OptionGroupTitle';
import InputInfo from '../InputInfo';
import ControlInputField from './ControlInputField';
import './_checkbox-list.scss';

type ControlGroupProps = {
  name: string;
  options: string[];
  disabledList?: string[];
  groupTitle?: OptionGroupHeading;
  initialChecked?: string; // for radio
  inputInfo?: string;
  required?: boolean;
  type?: 'checkbox' | 'radio';
  values?: string[]; // for checkbox
  onChange: (event: ChangeInputType) => void;
};

const ControlGroup = ({
  name,
  options,
  groupTitle,
  required,
  inputInfo,
  type = 'checkbox',
  values = [],
  initialChecked,
  disabledList,
  onChange,
}: ControlGroupProps) => (
  <section>
    {groupTitle && (
      <OptionGroupTitle groupTitle={groupTitle} required={required} />
    )}
    <ul className="control-list">
      {options.map((label, index) => {
        const id = `${type}-${index}`;
        const checked =
          type === 'checkbox'
            ? values.includes(label)
            : initialChecked === label;

        return (
          <ControlInputField
            key={label}
            id={id}
            type={type}
            name={name}
            value={label}
            checked={checked}
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

export default ControlGroup;
