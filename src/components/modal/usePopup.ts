/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { toggleModal } from '../../features/modalSlice';
import { KeyCode } from '../../types/enums';

const usePopup = (modalId: string | null) => {
  const dispatch = useAppDispatch();
  const popupRef = useRef<HTMLDialogElement | null>(null);

  const handleClosePopup = () => {
    dispatch(toggleModal(null));
  };

  useEffect(() => {
    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (popupRef.current && modalId) {
        const focusableElements = popupRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        const firstFocusableElement =
          focusableElements[0] as HTMLElement | null;
        const lastFocusableElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement | null;

        if (event.key === KeyCode.Tab) {
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
  }, [modalId]);

  return { onClosePopup: handleClosePopup, popupRef };
};

export default usePopup;
