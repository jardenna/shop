import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { toggleModal } from '../../features/modalSlice';
import { KeyCode } from '../../types/enums';

const useModal = (modalId: string) => {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const handleCloseModal = useCallback(() => {
    dispatch(toggleModal(null));
    setIsMounted(false);
  }, [dispatch]);

  const handleOpenModal = useCallback(() => {
    if (modalId) {
      dispatch(toggleModal(modalId));
    }
  }, [dispatch, modalId]);

  // Watch for the modal being added to the DOM
  useEffect(() => {
    if (modalRef.current) {
      setIsMounted(true);
      return;
    }

    const observer = new MutationObserver(() => {
      if (modalRef.current) {
        setIsMounted(true);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Focus trap logic (only when modal is mounted)
  useEffect(() => {
    if (!isMounted || !modalRef.current) {
      return;
    }

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    if (focusableElements.length === 0) {
      return;
    }

    const firstFocusableElement = focusableElements[0] as HTMLElement;
    const lastFocusableElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (event.key !== KeyCode.Tab.toString()) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastFocusableElement
      ) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    modal.addEventListener('keydown', handleTabKeyPress);

    return () => {
      modal.removeEventListener('keydown', handleTabKeyPress);
    };
  }, [isMounted]);

  return { handleCloseModal, openModal: handleOpenModal, modalRef };
};

export default useModal;
