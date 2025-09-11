import { IconName } from '../../../types/enums';
import type {
  ControlInputType,
  InputChangeHandler,
  OptionGroupHeading,
} from '../../../types/types';
import { colorMap } from '../../../utils/colorUtils';
import OptionGroupTitle from '../../productLists/OptionGroupTitle';
import type { ProductLabelVariant } from '../../productLists/ProductListItem';
import InputInfo from '../InputInfo';
import ControlInput from './ControlInput';
import './_control-list.scss';

export type BaseControlGroupProps = {
  name: string;
  onChange: InputChangeHandler;
  options: string[];
  ariaLabel?: string;
  autoFocus?: boolean;
  className?: string;
  disabledList?: string[];
  groupTitle?: OptionGroupHeading;
  iconClassName?: string;
  iconName?: IconName;
  iconSize?: string;
  inputInfo?: string;
  required?: boolean;
  variant?: ProductLabelVariant;
};

type ControlListProps = BaseControlGroupProps & {
  type: ControlInputType;
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
  iconSize,
  ariaLabel,
  iconClassName,
}: ControlListProps) => (
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
          <li key={label} className="control-item">
            <ControlInput
              iconSize={iconSize}
              autoFocus={autoFocus && index === 0}
              iconName={iconName}
              fill={iconName ? colorMap[label] : ''}
              id={id}
              type={type}
              name={name}
              value={label}
              checked={checked}
              disabled={
                disabledList ? !disabledList.includes(label) : undefined
              }
              onChange={onChange}
              label={label}
              ariaLabel={ariaLabel}
              variant={variant}
              iconClassName={iconClassName}
            />
          </li>
        );
      })}
    </ul>
    {inputInfo && <InputInfo inputInfo={inputInfo} />}
  </div>
);

export default ControlList;
