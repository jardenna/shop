import { ReactNode } from 'react';
import { IconName } from '../../../types/enums';
import { ChangeInputType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import Control from '../Control';
import './_checkbox.scss';

type CheckboxListProps = {
  checkBoxList: string[];
  name: string;
  values: string[];
  ariaLabel?: string;
  className?: string;
  iconName?: IconName;
  language?: Record<string, string>;
  onChange: (event: ChangeInputType) => void;
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
