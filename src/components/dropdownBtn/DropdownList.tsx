import { useKeyboardListNav } from '../../hooks/useKeyboardListNav';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import Icon from '../icons/Icon';
import type { DropdownItem } from './DropdownBtn';

interface DropdownListProps {
  dropdownList: DropdownItem[];
  defaultIndex?: number;
}

const DropdownList = ({ dropdownList, defaultIndex }: DropdownListProps) => {
  const { listRefs } = useKeyboardListNav({
    defaultIndex,
    dropdownList,
  });

  return (
    <ul>
      {dropdownList.map(
        (
          { label, onClick, btnVariant, disabled, isActive, iconName },
          index,
        ) => (
          <li key={label} className="dropdown-item">
            <Button
              variant={btnVariant || BtnVariant.Ghost}
              className={isActive ? 'active' : ''}
              onClick={onClick}
              disabled={disabled}
              refCallback={(element) => {
                listRefs.current[index] = element;
              }}
            >
              <span>{label}</span>
              {iconName && <Icon iconName={iconName} />}
            </Button>
          </li>
        ),
      )}
    </ul>
  );
};

export default DropdownList;
