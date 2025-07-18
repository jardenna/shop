import useLanguage from '../../../features/language/useLanguage';
import type { ChangeInputType, OptionType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import Input from '../Input';
import './_checkbox.scss';

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
  name,
  values,
  formInfoText,
}: CheckboxProps) => {
  const { language } = useLanguage();

  return (
    <ul className="checkbox-list">
      {checkBoxList.map((checkbox) => (
        <li key={checkbox.label} className="checkbox-item">
          <Input
            type="checkbox"
            name={name}
            value={checkbox.value}
            onChange={onChange}
            checked={values.includes(checkbox.value)}
            id={checkbox.label}
            labelText={getlowerCaseFirstLetter(checkbox.label, language)}
          />
        </li>
      ))}
      {formInfoText && <section className="form-info">{formInfoText}</section>}
    </ul>
  );
};

export default Checkbox;
