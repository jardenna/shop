import { useEffect, useRef } from 'react';

interface UseTrapFocusProps {
  enabled: boolean;
  popupRef: React.RefObject<HTMLElement | null>;
}

export const useTrapFocus = ({ popupRef, enabled }: UseTrapFocusProps) => {
  const triggerRef = useRef<HTMLElement | null>(null);

  const getFocusableElements = () => {
    if (!popupRef.current) {
      return [];
    }

    return Array.from(
      popupRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    );
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }

    triggerRef.current = document.activeElement as HTMLElement;

    const focusPopup = () => {
      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) {
        return;
      }

      const firstFocusableElement = focusableElements[0];

      firstFocusableElement.focus();
    };

    const animationFrameId = requestAnimationFrame(focusPopup);

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

      if (focusableElements.length === 0) {
        return;
      }

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

  useEffect(() => {
    if (enabled) {
      return;
    }

    triggerRef.current?.focus();
    triggerRef.current = null;
  }, [enabled]);
};
