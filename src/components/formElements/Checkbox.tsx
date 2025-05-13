import useLanguage from '../../features/language/useLanguage';
import { ChangeInputType, OptionType } from '../../types/types';
import { getlowerCaseFirstLetter } from '../../utils/utils';
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
}: CheckboxProps) => {
  const { language } = useLanguage();

  return (
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
            labelText={getlowerCaseFirstLetter(checkbox.label, language)}
          />
        </li>
      ))}
      {formInfoText && <section className="form-info">{formInfoText}</section>}
    </ul>
  );
};

export default Checkbox;
