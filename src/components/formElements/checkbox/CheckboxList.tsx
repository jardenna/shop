import type { ReactNode } from 'react';
import { IconName } from '../../../types/enums';
import { Language } from '../../../types/types';
import { translateKey } from '../../../utils/utils';
import ControlInput, { BaseControlInputProps } from '../ControlInput';
import './_checkbox.scss';

interface CheckboxListProps extends BaseControlInputProps {
  checkBoxList: string[];
  language: Language;
  values: string[];
  ariaLabel?: string;
  className?: string;
  iconName?: IconName;
  renderExtra?: (checkbox: string) => ReactNode;
}

const CheckboxList = ({
  checkBoxList,
  className = '',
  onChange,
  values,
  name,
  language,
  iconName,
  renderExtra,
  ariaLabel,
  autoFocus,
}: CheckboxListProps) => (
  <ul className={`checkbox-list ${className}`}>
    {checkBoxList.map((checkbox, index) => (
      <li key={checkbox} className="checkbox-item">
        <ControlInput
          ariaLabel={ariaLabel}
          name={name}
          iconName={iconName}
          id={`${name}-${checkbox}`}
          value={checkbox}
          onChange={onChange}
          autoFocus={autoFocus && index === 0}
          checked={values.includes(checkbox)}
          label={translateKey(checkbox, language)}
          renderExtra={renderExtra ? renderExtra(checkbox) : undefined}
        />
      </li>
    ))}
  </ul>
);

export default CheckboxList;
