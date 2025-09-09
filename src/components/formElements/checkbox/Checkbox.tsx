import { IconName } from '../../../types/enums';
import { ChangeInputType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import IconContent from '../../IconContent';
import './_checkbox.scss';

interface CheckboxProps {
  checkBoxList: string[];
  name: string;
  values: string[];
  language?: Record<string, string>;
  variant?: string;
  onChange: (event: ChangeInputType) => void;
  renderExtra?: (checkbox: string) => React.ReactNode;
}

const Checkbox = ({
  checkBoxList,
  onChange,
  values,
  name,
  language,
  variant = '',
  renderExtra,
}: CheckboxProps) => (
  <ul className={`checkbox-list ${variant}`}>
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
        <label htmlFor={`${name}-${index}`} className="checkbox-label">
          {language ? getlowerCaseFirstLetter(checkbox, language) : checkbox}
          {renderExtra && renderExtra(checkbox)}
          {variant && (
            <IconContent
              iconName={IconName.Close}
              title=""
              size="16"
              ariaLabel="language.removeFilter"
            />
          )}
        </label>
      </li>
    ))}
  </ul>
);

export default Checkbox;
