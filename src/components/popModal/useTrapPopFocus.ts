import { useEffect } from 'react';

interface UseTrapFocusProps {
  enabled: boolean;
  popupRef: React.RefObject<HTMLElement | null>;
}

export const useTrapPopFocus = ({ popupRef, enabled }: UseTrapFocusProps) => {
  const getFocusableElements = () => {
    if (!popupRef.current) {
      return [];
    }

    return popupRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const focusModal = () => {
      const focusableElements = getFocusableElements();
      const firstFocusableElement = focusableElements[0];

      firstFocusableElement.focus();
    };

    const animationFrameId = requestAnimationFrame(focusModal);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements();
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement =
        focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    document.addEventListener('keydown', handleTabKeyPress);

    return () => {
      document.removeEventListener('keydown', handleTabKeyPress);
    };
  }, [enabled]);
};
