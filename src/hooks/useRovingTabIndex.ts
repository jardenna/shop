import { useRef, useState } from 'react';
import { KeyCode } from '../types/enums';
import { useKeyboardNavigation } from './useKeyboardNavigation';

interface UseRovingTabIndexProps {
  defaultIndex: number;
  itemCount: number;
  onChange: (index: number) => void;
}

export const useRovingTabIndex = ({
  defaultIndex,
  itemCount,
  onChange,
}: UseRovingTabIndexProps) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { getNextIndex } = useKeyboardNavigation({
    selectedIndex,
    itemCount,
  });

  const handleChange = (index: number) => {
    setSelectedIndex(index);
    onChange(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const nextIndex = getNextIndex(event.key as KeyCode);

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();

    handleChange(nextIndex);
    itemRefs.current[nextIndex]?.focus();
  };

  return {
    selectedIndex,
    itemRefs,
    handleKeyDown,
    handleChange,
  };
};
