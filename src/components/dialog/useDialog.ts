import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { toggleModal } from '../../features/modalSlice';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useTrapFocus } from '../../hooks/useTrapFocus';
import { KeyCode } from '../../types/enums';

export const useDialog = (modalId: string | null) => {
  const dispatch = useAppDispatch();
  const popupRef = useRef<HTMLDialogElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const closeModal = () => {
    setIsVisible(false);
  };

  const handleAnimationEnd = () => {
    if (!isVisible) {
      setIsMounted(false);
      dispatch(toggleModal(null));
    }
  };

  // Save trigger element when modal opens, restore focus when it closes
  useEffect(() => {
    if (modalId) {
      triggerRef.current = document.activeElement as HTMLElement;
      setIsMounted(true);
      setIsVisible(true);
    }
  }, [modalId]);

  useEffect(() => {
    if (!modalId && !isMounted) {
      triggerRef.current?.focus();
      triggerRef.current = null;
    }
  }, [modalId, isMounted]);

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

  useKeyPress(closeModal, [KeyCode.Esc]);

  const popupClass = isVisible ? 'is-visible' : 'dismissed';

  return {
    closeModal,
    handleAnimationEnd,
    isMounted,
    popupClass,
    popupRef,
  };
};
