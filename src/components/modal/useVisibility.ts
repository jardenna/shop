import { useEffect, useRef, useState } from 'react';
import useKeyPress from '../../hooks/useKeyPress';
import { KeyCode } from '../../types/enums';

const useVisibility = (
  isOpen: boolean,
  closeCallback: () => void,
  onClearAllValues?: () => void,
  duration?: number, // Auto-dismiss duration in milliseconds
  transitionDuration = 500, // Animation duration in milliseconds
) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleCloseModal = () => {
    setIsVisible(false);
    timeoutRef.current = window.setTimeout(closeCallback, transitionDuration);
    if (onClearAllValues) {
      onClearAllValues();
    }
  };

  useKeyPress(handleCloseModal, [KeyCode.Esc]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (duration) {
        timeoutRef.current = window.setTimeout(handleCloseModal, duration);
      }
    } else {
      handleCloseModal();
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, duration]);

  const popupClass = isVisible ? 'is-visible' : 'dismissed';

  return { popupClass, onCloseModal: handleCloseModal };
};

export default useVisibility;
