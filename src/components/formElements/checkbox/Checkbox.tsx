import { FC } from 'react';
import useLanguage from '../../../features/language/useLanguage';
import { ChangeInputType } from '../../../types/types';
import { colorMap } from '../../../utils/colorUtils';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
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
}) => {
  const { language } = useLanguage();
  return (
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
          <label htmlFor={`${name}-${index.toString()}`}>
            {getlowerCaseFirstLetter(checkbox, language)}
            <div
              className="small-item"
              style={{ backgroundColor: colorMap[checkbox] }}
            />
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Checkbox;
