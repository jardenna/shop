import { IconName } from '../../../types/enums';
import { ChangeInputType, OptionGroupHeading } from '../../../types/types';
import OptionGroupTitle from '../../productLists/OptionGroupTitle';
import { ProductLabelVariant } from '../../productLists/ProductListItem';
import InputInfo from '../InputInfo';
import ControlInputField from './ControlInputField';
import './_control-list.scss';

export type BaseControlGroupProps = {
  name: string;
  options: string[];
  autoFocus?: boolean;
  className?: string;
  disabledList?: string[];
  groupTitle?: OptionGroupHeading;
  iconName?: IconName;
  inputInfo?: string;
  required?: boolean;
  variant?: ProductLabelVariant;
  onChange: (event: ChangeInputType) => void;
};

type ControlList = BaseControlGroupProps & {
  type: 'checkbox' | 'radio';
  initialChecked?: string;
  values?: string[];
};

const ControlList = ({
  name,
  options,
  groupTitle,
  required,
  inputInfo,
  type,
  values = [],
  initialChecked,
  disabledList,
  onChange,
  iconName,
  className = 'size-list',
  autoFocus,
  variant = 'medium',
}: ControlList) => (
  <div>
    {groupTitle && (
      <OptionGroupTitle groupTitle={groupTitle} required={required} />
    )}
    <ul
      className={`control-list ${className}`}
      aria-labelledby={groupTitle ? groupTitle.id : undefined}
    >
      {options.map((label, index) => {
        const id = `${name}-${index}`;
        const checked =
          type === 'checkbox'
            ? values.includes(label)
            : initialChecked === label;

        return (
          <ControlInputField
            key={label}
            autoFocus={autoFocus}
            iconName={iconName}
            id={id}
            type={type}
            name={name}
            value={label}
            checked={checked}
            disabled={disabledList ? !disabledList.includes(label) : undefined}
            onChange={onChange}
            label={label}
            variant={variant}
          />
        );
      })}
    </ul>
    {inputInfo && <InputInfo inputInfo={inputInfo} />}
  </div>
);

export default ControlList;
