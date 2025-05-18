import { RefObject, useEffect } from 'react';

const useTrap = (
  modalId: string | null,
  popupRef: RefObject<HTMLDialogElement | null>,
) => {
  useEffect(() => {
    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (popupRef.current && modalId) {
        const focusableElements =
          popupRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.key === 'Tab') {
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleTabKeyPress);
    return () => {
      document.removeEventListener('keydown', handleTabKeyPress);
    };
  }, [modalId, popupRef]);
};

export default useTrap;
