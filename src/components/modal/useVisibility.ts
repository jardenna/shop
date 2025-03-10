import { useEffect, useRef, useState } from 'react';
import useKeyPress from '../../hooks/useKeyPress';
import { KeyCode } from '../../types/enums';

interface VisibilityProps {
  isModalOpen: boolean;
  transitionDuration?: number;
  closeModalCallback?: () => void;
}

const useVisibility = ({
  isModalOpen,
  closeModalCallback,
  transitionDuration = 500,
}: VisibilityProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleClosePopup = () => {
    setIsVisible(false);
    if (closeModalCallback) {
      timeoutRef.current = window.setTimeout(
        closeModalCallback,
        transitionDuration,
      );
    }
  };

  useKeyPress(handleClosePopup, [KeyCode.Esc]);

  useEffect(() => {
    if (isModalOpen) {
      setIsVisible(true);
    } else {
      handleClosePopup();
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isModalOpen]);

  const popupClass = isVisible ? 'is-visible' : 'dismissed';

  return { popupClass, handleClosePopup };
};

export default useVisibility;
