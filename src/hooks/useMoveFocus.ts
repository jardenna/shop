import { RefObject, useEffect, useRef } from 'react';
import { KeyCode } from '../types/enums';
import { useKeyPress } from './useKeyPress';

interface UseMoveFocusProps {
  isPopupOpen: boolean;
  triggerRef?: RefObject<HTMLElement | null>;
  closePopup: () => void;
}

export const useMoveFocus = ({
  closePopup,
  isPopupOpen,
  triggerRef,
}: UseMoveFocusProps) => {
  const initialFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isPopupOpen) {
      initialFocusRef.current =
        triggerRef?.current ?? (document.activeElement as HTMLElement);
    }
  }, [isPopupOpen, triggerRef]);

  const handleEscape = () => {
    closePopup();
    initialFocusRef.current?.focus();
    initialFocusRef.current = null;
  };

  useKeyPress(handleEscape, [KeyCode.Esc], isPopupOpen);
};
