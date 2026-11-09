import { KeyboardEvent as ReactKeyboardEvent, useRef, useState } from 'react';
import { ActionNavItemProps } from '../components/dropdownBtn/ActionNavBtn';

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

  const handleActivateListItem = (index: number) => {
    setSelectedListItemIndex(index);
    itemRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    const lastIndex = actionNavDropdownList.length - 1;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        handleActivateListItem(
          (selectedListItemIndex + 1) % actionNavDropdownList.length,
        );
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        handleActivateListItem(
          (selectedListItemIndex - 1 + actionNavDropdownList.length) %
            actionNavDropdownList.length,
        );
        break;

      case 'Home':
        event.preventDefault();
        handleActivateListItem(0);
        break;

      case 'End':
        event.preventDefault();
        handleActivateListItem(lastIndex);
        break;
    }
  };

  return { itemRefs, handleKeyDown };
};
