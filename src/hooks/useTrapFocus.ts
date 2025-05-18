import { useEffect, useRef } from 'react';

const useTrapFocus = (id: string) => {
  const popupRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (popupRef.current && id) {
        const focusableElements = popupRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        const firstFocusableElement =
          focusableElements[0] as HTMLElement | null;
        const lastFocusableElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement | null;

        if (event.key === 'Tab') {
          if (
            event.shiftKey &&
            document.activeElement === firstFocusableElement
          ) {
            event.preventDefault();
            lastFocusableElement?.focus();
          } else if (
            !event.shiftKey &&
            document.activeElement === lastFocusableElement
          ) {
            event.preventDefault();
            firstFocusableElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleTabKeyPress);

    return () => {
      document.removeEventListener('keydown', handleTabKeyPress);
    };
  }, [id]);

  return { popupRef };
};

export default useTrapFocus;
