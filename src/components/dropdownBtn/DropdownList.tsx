import { FC, RefObject, useRef, useState } from 'react';
import useKeyPress from '../../hooks/useKeyPress';
import { BtnVariant, KeyCode } from '../../types/enums';
import Button from '../Button';
import { DropdownItem } from './DropdownBtn';

interface DropdownListProps {
  ariaControls: string;
  dropdownList: DropdownItem[];
  ref: RefObject<HTMLDivElement | null>;
  defaultIndex?: number;
}

const DropdownList: FC<DropdownListProps> = ({
  dropdownList,
  ref,
  defaultIndex,
  ariaControls,
}) => {
  const [selectedListItemIndex, setSelectedListItemIndex] = useState(
    defaultIndex ?? -1,
  );
  const listRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleActivateListItem = (index: number) => {
    setSelectedListItemIndex(index);
    // Use arrowUp & arrowDown
    listRefs.current[index]?.focus();
  };

  const handleNextListItem = () => {
    handleActivateListItem((selectedListItemIndex + 1) % dropdownList.length);
  };

  const handlePrevListItem = () => {
    handleActivateListItem(
      (selectedListItemIndex - 1 + dropdownList.length) % dropdownList.length,
    );
  };

  const handleGotoFirstListItem = () => {
    handleActivateListItem(0);
  };

  const handleGotoLastListItem = () => {
    handleActivateListItem(dropdownList.length - 1);
  };

  useKeyPress(handleNextListItem, [KeyCode.ArrowRight]);
  useKeyPress(handlePrevListItem, [KeyCode.ArrowLeft]);
  useKeyPress(handleNextListItem, [KeyCode.ArrowDown]);
  useKeyPress(handlePrevListItem, [KeyCode.ArrowUp]);
  useKeyPress(handleGotoFirstListItem, [KeyCode.Home]);
  useKeyPress(handleGotoLastListItem, [KeyCode.End]);

  return (
    <div className="dropdown-list" ref={ref}>
      <ul id={ariaControls}>
        {dropdownList.map(
          ({ id, label, onClick, className = '', icon }, index) => (
            <li key={id}>
              <Button
                variant={BtnVariant.Ghost}
                onClick={onClick}
                tabIndex={index === selectedListItemIndex ? 0 : -1}
                ref={(el) => {
                  listRefs.current[index] = el;
                }}
                ariaSelected={index === selectedListItemIndex}
                className={`${className} ${index === selectedListItemIndex ? 'active' : ''}`}
              >
                {label} {icon}
              </Button>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default DropdownList;
