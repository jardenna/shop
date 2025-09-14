import { ReactNode } from 'react';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import type { BaseControlProps } from '../ControlInput';
import ControlInput from '../ControlInput';
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
  iconName,
  renderExtra,
  ariaLabel,
  autoFocus,
}: CheckboxListProps) => (
  <ul className="checkbox-list">
    {checkBoxList.map((checkbox, index) => (
      <li key={checkbox} className="checkbox-item">
        <ControlInput
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
