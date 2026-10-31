import { useRef, useState } from 'react';
import { ActionNavItemProps } from '../components/dropdownBtn/ActionNavBtn';
import { KeyCode } from '../types/enums';
import { useKeyPress } from './useKeyPress';

type UseKeyboardListNavProps = {
  actionNavDropdownList: ActionNavItemProps[];
  defaultIndex?: number;
};

export const useKeyboardListNav = ({
  defaultIndex,
  actionNavDropdownList,
}: UseKeyboardListNavProps) => {
  const listRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selectedListItemIndex, setSelectedListItemIndex] = useState(
    defaultIndex ?? 0,
  );

  const handleActivateListItem = (index: number) => {
    setSelectedListItemIndex(index);
    listRefs.current[index]?.focus();
  };

  const handleNextListItem = () => {
    handleActivateListItem(
      (selectedListItemIndex + 1) % actionNavDropdownList.length,
    );
  };

  const handlePrevListItem = () => {
    handleActivateListItem(
      (selectedListItemIndex - 1 + actionNavDropdownList.length) %
        actionNavDropdownList.length,
    );
  };

  const handleGotoFirstListItem = () => {
    handleActivateListItem(0);
  };

  const handleGotoLastListItem = () => {
    handleActivateListItem(actionNavDropdownList.length - 1);
  };

  useKeyPress(handleNextListItem, [KeyCode.ArrowRight]);
  useKeyPress(handlePrevListItem, [KeyCode.ArrowLeft]);
  useKeyPress(handleNextListItem, [KeyCode.ArrowDown]);
  useKeyPress(handlePrevListItem, [KeyCode.ArrowUp]);
  useKeyPress(handleGotoFirstListItem, [KeyCode.Home]);
  useKeyPress(handleGotoLastListItem, [KeyCode.End]);

  return { listRefs };
};
