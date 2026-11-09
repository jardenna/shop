import { useRef, useState } from 'react';
import { ActionNavItemProps } from '../components/dropdownBtn/ActionNavBtn';
import { KeyCode } from '../types/enums';
import { useKeyboardNavigation } from './useKeyboardNavigation';

interface UseKeyboardListNavProps {
  actionNavDropdownList: ActionNavItemProps[];
  defaultIndex?: number;
}

export const useKeyboardListNav = ({
  defaultIndex,
  actionNavDropdownList,
}: UseKeyboardListNavProps) => {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selectedListItemIndex, setSelectedListItemIndex] = useState(
    defaultIndex ?? 0,
  );

  const { getNextIndex } = useKeyboardNavigation({
    selectedIndex: selectedListItemIndex,
    itemCount: actionNavDropdownList.length,
  });

  const handleActivateListItem = (index: number) => {
    setSelectedListItemIndex(index);
    itemRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const nextIndex = getNextIndex(event.key as KeyCode);

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    handleActivateListItem(nextIndex);
  };

  return {
    itemRefs,
    handleKeyDown,
    selectedListItemIndex,
  };
};
