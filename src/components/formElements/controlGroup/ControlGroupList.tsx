import useLanguage from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import type {
  ControlInputType,
  InputChangeHandler,
  OptionGroupHeading,
} from '../../../types/types';
import { colorMap } from '../../../utils/colorUtils';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import OptionGroupTitle from '../../productLists/OptionGroupTitle';
import type { ProductLabelVariant } from '../../productLists/ProductListItem';
import InputInfo from '../InputInfo';
import ControlGroupInput from './ControlGroupInput';
import './_control-list.scss';

export type BaseControlGroupProps = {
  name: string;
  onChange: InputChangeHandler;
  type: ControlInputType;
  autoFocus?: boolean;
  className?: string;
  groupTitle?: OptionGroupHeading;
  iconClassName?: string;
  iconName?: IconName;
  iconSize?: string;
  inputInfo?: string;
  required?: boolean;
  variant?: ProductLabelVariant;
};

type ControlGroupListProps = BaseControlGroupProps & {
  options: string[];
  disabledList?: string[];
  initialChecked?: string;
  values?: string[];
};

const ControlGroupList = ({
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
  iconClassName,
}: ControlGroupListProps) => {
  const { language } = useLanguage();
  const checked = (label: string) =>
    type === 'checkbox' ? values.includes(label) : initialChecked === label;

  return (
    <div>
      {groupTitle && (
        <OptionGroupTitle groupTitle={groupTitle} required={required} />
      )}
      <ul
        className={`control-list ${className}`}
        aria-labelledby={groupTitle ? groupTitle.id : undefined}
      >
        {options.map((label, index) => (
          <li key={label} className="control-item">
            <ControlGroupInput
              iconSize={iconSize}
              autoFocus={autoFocus && index === 0}
              iconName={iconName}
              fill={iconName ? colorMap[label] : ''}
              id={`${name}-${index}`}
              type={type}
              name={name}
              value={label}
              checked={checked(label)}
              ariaLabel={getlowerCaseFirstLetter(label, language)}
              disabled={
                disabledList ? !disabledList.includes(label) : undefined
              }
              onChange={onChange}
              label={label}
              variant={variant}
              iconClassName={iconClassName}
            />
          </li>
        ))}
      </ul>
      {inputInfo && <InputInfo inputInfo={inputInfo} />}
    </div>
  );
};

export default ControlGroupList;
