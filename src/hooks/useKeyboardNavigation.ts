interface UseKeyboardNavigationProps {
  itemCount: number;
  selectedIndex: number;
}

export const useKeyboardNavigation = ({
  selectedIndex,
  itemCount,
}: UseKeyboardNavigationProps) => {
  const getNextIndex = (key: string) => {
    if (itemCount === 0) {
      return null;
    }

    switch (key) {
      case 'ArrowRight':
      case 'ArrowDown':
        return (selectedIndex + 1) % itemCount;

      case 'ArrowLeft':
      case 'ArrowUp':
        return (selectedIndex - 1 + itemCount) % itemCount;

      case 'Home':
        return 0;

      case 'End':
        return itemCount - 1;

      default:
        return null;
    }
  };

  return { getNextIndex };
};
