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
  <>
    {checkBoxList.map((checkbox) => (
      <Input
        key={checkbox.label}
        type="checkbox"
        name={name}
        value={checkbox.label}
        onChange={onChange}
        checked={values.includes(checkbox.label)}
        id={checkbox.label}
        labelText={checkbox.label}
        className="visibility-hidden"
      />
    ))}
    {formInfoText && <section className="form-info">{formInfoText}</section>}
  </>
);

export default Checkbox;
