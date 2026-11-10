import { KeyCode } from '../types/enums';

interface UseKeyboardNavigationProps {
  itemCount: number;
  selectedIndex: number;
}

export const useKeyboardNavigation = ({
  selectedIndex,
  itemCount,
}: UseKeyboardNavigationProps) => {
  const getNextIndex = (key: KeyCode) => {
    if (itemCount === 0) {
      return null;
    }

    switch (key) {
      case KeyCode.ArrowRight:
      case KeyCode.ArrowDown:
        return selectedIndex < 0 ? 0 : (selectedIndex + 1) % itemCount;

      case KeyCode.ArrowLeft:
      case KeyCode.ArrowUp:
        return selectedIndex < 0
          ? itemCount - 1
          : (selectedIndex - 1 + itemCount) % itemCount;

      case KeyCode.Home:
        return 0;

      case KeyCode.End:
        return itemCount - 1;

      default:
        return null;
    }
  };

  return { getNextIndex };
};
