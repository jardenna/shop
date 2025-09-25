import useKeyboardListNav from '../../hooks/useKeyboardListNav';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import type { DropdownItem } from './DropdownBtn';

type DropdownListProps = {
  dropdownList: DropdownItem[];
  defaultIndex?: number;
};

const DropdownList = ({ dropdownList, defaultIndex }: DropdownListProps) => {
  const { listRefs } = useKeyboardListNav({
    defaultIndex,
    dropdownList,
  });
  // console.log(dropdownList);

  return (
    <ul>
      {dropdownList.map(
        ({ label, onClick, icon, btnVariant, disabled, isActive }, index) => (
          <li key={label} className="dropdown-item">
            <Button
              variant={btnVariant || BtnVariant.WidthIcon}
              className={isActive ? 'active' : ''}
              onClick={onClick}
              disabled={disabled}
              ref={(el) => {
                listRefs.current[index] = el;
              }}
            >
              <span>{label}</span>
              <span>{icon}</span>
            </Button>
          </li>
        ),
      )}
    </ul>
  );
};

export default DropdownList;
