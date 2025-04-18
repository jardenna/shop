import { ChangeInputType } from '../../../types/types';
import Input from '../Input';
import './_checkbox.scss';

export type CheckboxItems = {
  label: string;
};

type CheckboxProps = {
  checkBoxList: CheckboxItems[];
  values: string[];
  formInfoText?: string;
  onChange: (event: ChangeInputType) => void;
};

const Checkbox = ({
  checkBoxList,
  onChange,
  values,
  formInfoText,
}: CheckboxProps) => (
  <>
    {checkBoxList.map((checkbox) => (
      <Input
        key={checkbox.label}
        type="checkbox"
        name="selectedItems"
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
