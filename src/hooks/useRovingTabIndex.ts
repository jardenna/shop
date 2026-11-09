import { useRef } from 'react';

interface UseRovingTabIndexProps {
  itemCount: number;
  selectedIndex: number;
  onChange: (index: number) => void;
}

export function useRovingTabIndex({
  selectedIndex,
  itemCount,
  onChange,
}: UseRovingTabIndexProps) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    let nextIndex = selectedIndex;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (selectedIndex + 1) % itemCount;
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (selectedIndex - 1 + itemCount) % itemCount;
        break;

      case 'Home':
        nextIndex = 0;
        break;

      case 'End':
        nextIndex = itemCount - 1;
        break;

      default:
        return;
    }

    event.preventDefault();

    onChange(nextIndex);
    itemRefs.current[nextIndex]?.focus();
  };

  return {
    itemRefs,
    handleKeyDown,
  };
}
