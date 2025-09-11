import { ReactNode } from 'react';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import type { BaseControlProps } from '../Control';
import Control from '../Control';
import './_checkbox.scss';

type CheckboxListProps = BaseControlProps & {
  checkBoxList: string[];
  values: string[];
  renderExtra?: (checkbox: string) => ReactNode;
};

const CheckboxList = ({
  checkBoxList,
  onChange,
  values,
  name,
  language,
  className = '',
  iconName,
  renderExtra,
  ariaLabel,
  autoFocus,
}: CheckboxListProps) => (
  <ul className={`checkbox-list ${className}`}>
    {checkBoxList.map((checkbox, index) => (
      <li key={checkbox} className="checkbox-item">
        <Control
          ariaLabel={ariaLabel}
          name={name}
          iconName={iconName}
          id={`${name}-${index}`}
          value={checkbox}
          onChange={onChange}
          autoFocus={autoFocus && index === 0}
          checked={values.includes(checkbox)}
          label={
            language ? getlowerCaseFirstLetter(checkbox, language) : checkbox
          }
          renderExtra={renderExtra ? renderExtra(checkbox) : undefined}
        />
      </li>
    ))}
  </ul>
);

export default CheckboxList;
