import { RefObject, useRef, useState } from 'react';
import useKeyPress from '../../hooks/useKeyPress';
import { BtnVariant, KeyCode } from '../../types/enums';
import Button from '../Button';
import { DropdownItem } from './DropdownBtn';

type DropdownListProps = {
  ariaControls: string;
  dropdownList: DropdownItem[];
  ref: RefObject<HTMLDivElement | null>;
  defaultIndex?: number;
};

const DropdownList = ({
  dropdownList,
  ref,
  defaultIndex,
  ariaControls,
}: DropdownListProps) => {
  const [selectedListItemIndex, setSelectedListItemIndex] = useState(
    defaultIndex ?? 0,
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
    <div ref={ref}>
      <ul id={ariaControls} className="dropdown-list">
        {dropdownList.map(
          (
            { id, label, onClick, className = '', icon, btnVariant, hide },
            index,
          ) =>
            !hide && (
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
                  <span>{label}</span>
                  <span>{icon}</span>
                </Button>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default DropdownList;
