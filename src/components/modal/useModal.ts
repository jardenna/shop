import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch } from '../../app/hooks';
import { toggleModal } from '../../features/modalSlice';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useTrapFocus } from '../../hooks/useTrapFocus';

export const useModal = (modalId: string | null) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const popupRef = useRef<HTMLDialogElement | null>(null);

  // Stores the element that triggered the modal
  const triggerRef = useRef<HTMLElement | null>(null);

  // Close modal by resetting the modalId in Redux
  const handleClosePopup = () => {
    dispatch(toggleModal(null));
  };

  // Save trigger element when modal opens, restore focus when it closes
  useEffect(() => {
    if (modalId) {
      triggerRef.current = document.activeElement as HTMLElement;
    } else {
      triggerRef.current?.focus();
      triggerRef.current = null;
    }
  }, [modalId]);

  // Close modal whenever the route/location changes
  useEffect(() => {
    if (modalId) {
      handleClosePopup();
    }
  }, [location, dispatch]);

  useScrollLock(Boolean(modalId));

  // Make background inert (unfocusable and non-interactable) while modal is open
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
  }, [modalId, popupRef.current]);

  // Trap focus inside modal (keyboard users cannot tab out)
  useTrapFocus({ id: modalId, popupRef });

  return { closeModalState: handleClosePopup, popupRef };
};
