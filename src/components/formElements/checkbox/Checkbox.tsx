import { FC } from 'react';
import { ChangeInputType } from '../../../types/types';
import './_checkbox.scss';

interface CheckboxProps {
  checkBoxList: string[];
  name: string;
  values: string[];
  onChange: (event: ChangeInputType) => void;
}

const Checkbox: FC<CheckboxProps> = ({
  checkBoxList,
  onChange,
  values,
  name,
}) => (
  <ul className="checkbox-list">
    {checkBoxList.map((checkbox, index) => (
      <li key={checkbox} className="checkbox-item">
        <input
          type="checkbox"
          name={name}
          id={`${name}-${index.toString()}`}
          value={checkbox}
          onChange={onChange}
          checked={values.includes(checkbox)}
        />
        <label htmlFor={`${name}-${index.toString()}`}>{checkbox}</label>
      </li>
    ))}
  </ul>
);

export default Checkbox;
