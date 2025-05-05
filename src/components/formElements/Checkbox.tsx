import { ChangeInputType } from '../../types/types';
import Input from './Input';

export type CheckboxItems = {
  label: string;
};

type CheckboxProps = {
  checkBoxList: CheckboxItems[];
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
          value={checkbox.label}
          onChange={onChange}
          checked={values.includes(checkbox.label)}
          id={checkbox.label}
          labelText={checkbox.label}
          className="visibility-hidden"
        />
      </li>
    ))}
    {formInfoText && <section className="form-info">{formInfoText}</section>}
  </ul>
);

export default Checkbox;
