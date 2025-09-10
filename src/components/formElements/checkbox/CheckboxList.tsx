import { ReactNode } from 'react';
import { ChangeInputType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import './_checkbox.scss';

interface CheckboxListProps {
  checkBoxList: string[];
  name: string;
  values: string[];
  children?: ReactNode;
  className?: string;
  language?: Record<string, string>;
  onChange: (event: ChangeInputType) => void;
  renderExtra?: (checkbox: string) => React.ReactNode;
}

const CheckboxList = ({
  checkBoxList,
  children,
  onChange,
  values,
  name,
  language,
  className = '',
  renderExtra,
}: CheckboxListProps) => (
  <ul className={`checkbox-list ${className}`}>
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
          {children}
        </label>
      </li>
    ))}
  </ul>
);

export default CheckboxList;
