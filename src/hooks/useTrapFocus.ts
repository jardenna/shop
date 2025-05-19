import { RefObject, useEffect } from 'react';

type useTrapFocusProps = {
  id: string | null;
  popupRef: RefObject<HTMLDialogElement | null>;
};

const useTrapFocus = ({ id, popupRef }: useTrapFocusProps) => {
  useEffect(() => {
    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (popupRef.current && id) {
        const focusableElements =
          popupRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );

        const firstFocusableElement = focusableElements[0];

        const lastFocusableElement =
          focusableElements[focusableElements.length - 1];

        if (event.key === 'Tab') {
          if (
            event.shiftKey &&
            document.activeElement === firstFocusableElement
          ) {
            event.preventDefault();
            lastFocusableElement.focus();
          } else if (
            !event.shiftKey &&
            document.activeElement === lastFocusableElement
          ) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleTabKeyPress);
    return () => {
      document.removeEventListener('keydown', handleTabKeyPress);
    };
  }, [id, popupRef]);
};

export default useTrapFocus;
