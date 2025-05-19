import useArrow from '../../hooks/UseArrow';
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
  const { selectedListItemIndex, listRefs } = useArrow({
    defaultIndex,
    dropdownList,
  });

  return (
    <ul id={ariaControls} className="dropdown-list">
      {dropdownList.map(
        ({ id, label, onClick, className = '', icon, btnVariant }, index) => (
          <li
            key={id}
            className={`dropdown-item ${className} ${index === selectedListItemIndex ? 'active' : ''}`}
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
        ),
      )}
    </ul>
  );
};

export default DropdownList;
