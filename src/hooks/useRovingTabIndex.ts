import { useRef } from 'react';
import { KeyCode } from '../types/enums';
import { useKeyboardNavigation } from './useKeyboardNavigation';

interface UseRovingTabIndexProps {
  itemCount: number;
  selectedIndex: number;
  onChange: (index: number) => void;
}

export const useRovingTabIndex = ({
  selectedIndex,
  itemCount,
  onChange,
}: UseRovingTabIndexProps) => {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { getNextIndex } = useKeyboardNavigation({
    selectedIndex,
    itemCount,
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const nextIndex = getNextIndex(event.key as KeyCode);

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();

    onChange(nextIndex);
    itemRefs.current[nextIndex]?.focus();
  };

  return { itemRefs, handleKeyDown };
};
