import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../../app/hooks';

import { toggleModal } from '../../features/modalSlice';
import { KeyCode } from '../../types/enums';

const useModal = (modalId: string) => {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseModal = () => {
    dispatch(toggleModal(null));
  };
  const handleOpenModal = () => {
    if (modalId) {
      dispatch(toggleModal(modalId));
    }
  };
  console.log(modalRef);

  useEffect(() => {
    if (modalRef.current && modalId) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      const firstFocusableElement = focusableElements[0] as HTMLElement | null;

      const lastFocusableElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement | null;

      const handleTabKeyPress = (event: KeyboardEvent) => {
        if (event.key === KeyCode.Tab.toString()) {
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
      };

      modalRef.current.addEventListener('keydown', handleTabKeyPress);

      return () => {
        modalRef.current?.removeEventListener('keydown', handleTabKeyPress);
      };
    }
  }, [modalId, modalRef.current]);

  return { handleCloseModal, openModal: handleOpenModal, modalRef };
};

export default useModal;
