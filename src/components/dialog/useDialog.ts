import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { toggleModal } from '../../features/modalSlice';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useTrapFocus } from '../../hooks/useTrapFocus';
import { KeyCode } from '../../types/enums';

export const useDialog = (
  modalId: string | null,
  onClearAllValues?: () => void,
  duration?: number,
  transitionDuration = 500,
) => {
  const dispatch = useAppDispatch();
  const popupRef = useRef<HTMLDialogElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Close modal by resetting the modalId in Redux
  const handleClosePopup = () => {
    setIsVisible(false);

    timeoutRef.current = window.setTimeout(() => {
      dispatch(toggleModal(null));
    }, transitionDuration);

    onClearAllValues?.();
  };

  // Save trigger element when modal opens, restore focus when it closes
  useEffect(() => {
    if (modalId) {
      triggerRef.current = document.activeElement as HTMLElement;
      setIsVisible(true);

      if (duration) {
        timeoutRef.current = window.setTimeout(handleClosePopup, duration);
      }
    } else {
      triggerRef.current?.focus();
      triggerRef.current = null;
      setIsVisible(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [modalId, duration]);

  useScrollLock(Boolean(modalId));

  // Make background inert while modal is open
  useEffect(() => {
    const root = document.getElementById('root');

    if (!root) {
      return;
    }

    const children = Array.from(root.children);

    if (modalId) {
      children.forEach((child) => {
        if (child !== popupRef.current) {
          child.setAttribute('inert', '');
        }
      });
    }

    return () => {
      // Always remove inert when effect cleans up
      children.forEach((child) => {
        child.removeAttribute('inert');
      });
    };
  }, [modalId]);

  // Trap focus inside modal
  useTrapFocus({
    id: modalId,
    popupRef,
    enabled: modalId !== null,
  });

  useKeyPress(handleClosePopup, [KeyCode.Esc]);

  const popupClass = isVisible ? 'is-visible' : 'dismissed';

  return {
    closeModal: handleClosePopup,
    popupClass,
    popupRef,
  };
};
