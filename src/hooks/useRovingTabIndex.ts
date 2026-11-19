import { useRef, useState } from 'react';
import { KeyCode } from '../types/enums';
import { keyboardNavigation } from '../utils/keyboardNavigation';

interface UseRovingTabIndexProps {
  itemCount: number;
  defaultIndex?: number;
  onChange?: (index: number) => void;
}

export const useRovingTabIndex = ({
  defaultIndex = 0,
  itemCount,
  onChange,
}: UseRovingTabIndexProps) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const { getNextIndex } = keyboardNavigation({
    selectedIndex,
    itemCount,
  });

  const handleChange = (index: number) => {
    setSelectedIndex(index);
    onChange?.(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const nextIndex = getNextIndex(event.key as KeyCode);

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();

    handleChange(nextIndex);
    itemsRef.current[nextIndex]?.focus();
  };

  return {
    selectedIndex,
    itemsRef,
    handleKeyDown,
    handleChange,
  };
};
