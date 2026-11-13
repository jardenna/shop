import type { ReactNode } from 'react';
import { IconName } from '../../../types/enums';
import { Language } from '../../../types/types';
import { translateKey } from '../../../utils/utils';
import ControlInput, { BaseControlInputProps } from '../ControlInput';
import './_checkbox.scss';

interface CheckboxListProps extends BaseControlInputProps {
  checkBoxList: readonly string[];
  language: Language;
  values: string[];
  className?: string;
  iconName?: IconName;
  showControlInfo?: boolean;
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
  autoFocus,
  showControlInfo,
}: CheckboxListProps) => (
  <ul className={`checkbox-list ${className}`}>
    {checkBoxList.map((checkbox, index) => (
      <li key={checkbox} className="checkbox-item">
        <ControlInput
          name={name}
          iconName={iconName}
          id={`${name}-${checkbox}`}
          value={checkbox}
          onChange={onChange}
          autoFocus={autoFocus && index === 0}
          checked={values.includes(checkbox)}
          label={translateKey(checkbox, language)}
          renderExtra={renderExtra ? renderExtra(checkbox) : undefined}
          showControlInfo={showControlInfo}
        />
      </li>
    ))}
  </ul>
);

export default CheckboxList;
