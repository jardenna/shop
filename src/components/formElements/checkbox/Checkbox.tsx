import { ChangeInputType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import './_checkbox.scss';

interface CheckboxProps {
  checkBoxList: string[];
  name: string;
  values: string[];
  language?: Record<string, string>;
  onChange: (event: ChangeInputType) => void;
  renderExtra?: (checkbox: string) => React.ReactNode;
}

const Checkbox = ({
  checkBoxList,
  onChange,
  values,
  name,
  language,
  renderExtra,
}: CheckboxProps) => (
  <ul className="checkbox-list">
    {checkBoxList.map((checkbox, index) => (
      <li key={checkbox} className="checkbox-item">
        <input
          type="checkbox"
          name={name}
          id={`${name}-${index}`}
          value={checkbox}
          onChange={onChange}
          checked={values.includes(checkbox)}
        />
        <label htmlFor={`${name}-${index}`}>
          {language ? getlowerCaseFirstLetter(checkbox, language) : checkbox}
          {renderExtra && renderExtra(checkbox)}
        </label>
      </li>
    ))}
  </ul>
);

export default Checkbox;
