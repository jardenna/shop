import useKeyboardListNav from '../../hooks/useKeyboardListNav';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import { DropdownItem } from './DropdownBtn';

type DropdownListProps = {
  ariaControls: string;
  dropdownList: DropdownItem[];
  defaultIndex?: number;
};

const DropdownList = ({
  dropdownList,
  defaultIndex,
  ariaControls,
}: DropdownListProps) => {
  const { selectedListItemIndex, listRefs } = useKeyboardListNav({
    defaultIndex,
    dropdownList,
  });

  return (
    <ul id={ariaControls}>
      {dropdownList.map(({ label, onClick, icon, btnVariant }, index) => (
        <li
          key={label}
          className={`dropdown-item ${index === selectedListItemIndex ? 'active' : ''}`}
        >
          <Button
            variant={btnVariant || BtnVariant.Ghost}
            onClick={onClick}
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
      ))}
    </ul>
  );
};

export default DropdownList;
