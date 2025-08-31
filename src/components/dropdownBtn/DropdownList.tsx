import useKeyboardListNav from '../../hooks/useKeyboardListNav';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import { DropdownItem } from './DropdownBtn';

type DropdownListProps = {
  dropdownList: DropdownItem[];
  defaultIndex?: number;
};

const DropdownList = ({ dropdownList, defaultIndex }: DropdownListProps) => {
  const { selectedListItemIndex, listRefs } = useKeyboardListNav({
    defaultIndex,
    dropdownList,
  });

  return (
    <ul>
      {dropdownList.map(
        ({ label, onClick, icon, btnVariant, disabled }, index) => (
          <li
            key={label}
            className={`dropdown-item ${index === selectedListItemIndex ? 'active' : ''}`}
          >
            <Button
              variant={btnVariant || BtnVariant.Ghost}
              onClick={onClick}
              disabled={disabled}
              tabIndex={index === selectedListItemIndex ? 0 : -1}
              ref={(el) => {
                listRefs.current[index] = el;
              }}
              ariaSelected={index === selectedListItemIndex}
            >
              {label}
              {icon}
            </Button>
          </li>
        ),
      )}
    </ul>
  );
};

export default DropdownList;
