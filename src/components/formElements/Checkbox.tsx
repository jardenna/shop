import useLanguage from '../../features/language/useLanguage';
import { ChangeInputType, OptionType } from '../../types/types';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import Input from './Input';

type CheckboxVariant = 'checkbox' | 'toggle-switch';

type CheckboxProps = {
  checkBoxList: OptionType[];
  name: string;
  values: string[];
  formInfoText?: string;
  variant?: CheckboxVariant;
  onChange: (event: ChangeInputType) => void;
};

const Checkbox = ({
  checkBoxList,
  onChange,
  values,
  formInfoText,
  name,
  variant = 'checkbox',
}: CheckboxProps) => {
  const { language } = useLanguage();

  return (
    <ul className={`${variant}-list`}>
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
            className={
              variant === 'toggle-switch'
                ? 'toggle-switch-input visually-hidden'
                : ''
            }
          />
        </li>
      ))}
      {formInfoText && <section className="form-info">{formInfoText}</section>}
    </ul>
  );
};

export default Checkbox;
