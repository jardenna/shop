import useLanguage from '../../../features/language/useLanguage';
import type { ChangeInputType, OptionType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import Input from '../Input';
import InputInfo from '../InputInfo';
import './_checkbox.scss';

type CheckboxProps = {
  checkBoxList: OptionType[];
  name: string;
  values: string[];
  inputInfo?: string;
  onChange: (event: ChangeInputType) => void;
};

const Checkbox = ({
  checkBoxList,
  onChange,
  name,
  values,
  inputInfo,
}: CheckboxProps) => {
  const { language } = useLanguage();

  return (
    <div>
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
      </ul>
      {inputInfo && <InputInfo inputInfo={inputInfo} />}
    </div>
  );
};

export default Checkbox;
