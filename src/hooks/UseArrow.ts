import { RefObject, useState } from 'react';
import { DropdownItem } from '../components/dropdownBtn/DropdownBtn';
import { KeyCode } from '../types/enums';
import useKeyPress from './useKeyPress';

type UseArrowProps = {
  dropdownList: DropdownItem[];
  listRefs: RefObject<(HTMLButtonElement | null)[]>;
  defaultIndex?: number;
};

const useArrow = ({ defaultIndex, dropdownList, listRefs }: UseArrowProps) => {
  const [selectedListItemIndex, setSelectedListItemIndex] = useState(
    defaultIndex ?? 0,
  );

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

  return { selectedListItemIndex, listRefs };
};

export default useArrow;
