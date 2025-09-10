import { ReactNode } from 'react';
import { ChangeInputType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import './_checkbox.scss';
import Control from './Control';

type CheckboxListProps = {
  checkBoxList: string[];
  name: string;
  values: string[];
  children?: ReactNode;
  className?: string;
  language?: Record<string, string>;
  onChange: (event: ChangeInputType) => void;
  renderExtra?: (checkbox: string) => React.ReactNode;
};

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
        <Control
          name={name}
          id={`${name}-${index}`}
          value={checkbox}
          onChange={onChange}
          checked={values.includes(checkbox)}
          label={
            language ? getlowerCaseFirstLetter(checkbox, language) : checkbox
          }
          renderExtra={renderExtra ? renderExtra(checkbox) : undefined}
        />
        {children}
      </li>
    ))}
  </ul>
);

export default CheckboxList;
