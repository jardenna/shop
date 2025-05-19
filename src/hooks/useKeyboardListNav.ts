import { useCallback, useRef, useState } from 'react';
import { DropdownItem } from '../components/dropdownBtn/DropdownBtn';
import { KeyCode } from '../types/enums';
import useKeyPress from './useKeyPress';

type UseKeyboardListNavProps = {
  dropdownList: DropdownItem[];

  defaultIndex?: number;
};

const useKeyboardListNav = ({
  defaultIndex,
  dropdownList,
}: UseKeyboardListNavProps) => {
  const listRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selectedListItemIndex, setSelectedListItemIndex] = useState(
    defaultIndex ?? 0,
  );

  const handleActivateListItem = useCallback(
    (index: number) => {
      setSelectedListItemIndex(index);
      listRefs.current[index]?.focus();
    },
    [listRefs],
  );

  const handleNextListItem = useCallback(() => {
    handleActivateListItem((selectedListItemIndex + 1) % dropdownList.length);
  }, [selectedListItemIndex, dropdownList.length, handleActivateListItem]);

  const handlePrevListItem = useCallback(() => {
    handleActivateListItem(
      (selectedListItemIndex - 1 + dropdownList.length) % dropdownList.length,
    );
  }, [selectedListItemIndex, dropdownList.length, handleActivateListItem]);

  const handleGotoFirstListItem = useCallback(() => {
    handleActivateListItem(0);
  }, [handleActivateListItem]);

  const handleGotoLastListItem = useCallback(() => {
    handleActivateListItem(dropdownList.length - 1);
  }, [dropdownList.length, handleActivateListItem]);

  useKeyPress(handleNextListItem, [KeyCode.ArrowRight]);
  useKeyPress(handlePrevListItem, [KeyCode.ArrowLeft]);
  useKeyPress(handleNextListItem, [KeyCode.ArrowDown]);
  useKeyPress(handlePrevListItem, [KeyCode.ArrowUp]);
  useKeyPress(handleGotoFirstListItem, [KeyCode.Home]);
  useKeyPress(handleGotoLastListItem, [KeyCode.End]);

  return { selectedListItemIndex, listRefs };
};

export default useKeyboardListNav;
