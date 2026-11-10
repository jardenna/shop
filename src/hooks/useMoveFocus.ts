import { useEffect, useRef } from 'react';
import { KeyCode } from '../types/enums';
import { useKeyPress } from './useKeyPress';

interface UseMoveFocusProps {
  isPopupOpen: boolean;
  closePopup: () => void;
}

export const useMoveFocus = ({
  closePopup,
  isPopupOpen,
}: UseMoveFocusProps) => {
  const initialFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isPopupOpen) {
      initialFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isPopupOpen]);

  const handleEscape = () => {
    closePopup();
    initialFocusRef.current?.focus();
    initialFocusRef.current = null;
  };

  useKeyPress(handleEscape, [KeyCode.Esc], isPopupOpen);
};
