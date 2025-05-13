import { ChangeInputType, OptionType } from '../../types/types';
import Input from './Input';

type CheckboxProps = {
  checkBoxList: OptionType[];
  name: string;
  values: string[];
  formInfoText?: string;
  onChange: (event: ChangeInputType) => void;
};

const Checkbox = ({
  checkBoxList,
  onChange,
  values,
  formInfoText,
  name,
}: CheckboxProps) => (
  <ul className="checkbox-list">
    {checkBoxList.map((checkbox) => (
      <li key={checkbox.label}>
        <Input
          type="checkbox"
          name={name}
          value={checkbox.value}
          onChange={onChange}
          checked={values.includes(checkbox.value)}
          id={checkbox.label}
          labelText={checkbox.label}
        />
      </li>
    ))}
    {formInfoText && <section className="form-info">{formInfoText}</section>}
  </ul>
);

export default Checkbox;
