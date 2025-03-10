import { FC, RefObject } from 'react';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import { DropdownItem } from './DropdownBtn';

interface DropdownListProps {
  dropdownList: DropdownItem[];
  ref: RefObject<HTMLDivElement | null>;
}

const DropdownList: FC<DropdownListProps> = ({ dropdownList, ref }) => (
  <div className="dropdown-list" ref={ref}>
    <ul>
      {dropdownList.map(({ id, label, onClick, className = '', icon }) => (
        <li key={id}>
          <Button
            variant={BtnVariant.Ghost}
            onClick={onClick}
            className={className}
          >
            {label} {icon}
          </Button>
        </li>
      ))}
    </ul>
  </div>
);

export default DropdownList;
