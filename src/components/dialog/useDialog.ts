import { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useTrapFocus } from '../../hooks/useTrapFocus';
import { KeyCode } from '../../types/enums';

interface UseDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const useDialog = ({ isOpen, onClose }: UseDialogProps) => {
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(isOpen);

  const popupRef = useRef<HTMLDialogElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const closeModal = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      setIsMounted(true);
      return;
    }

    if (isMounted) {
      setIsVisible(false);
    }
  }, [isOpen, isMounted]);

  useEffect(() => {
    if (isMounted && isOpen) {
      setIsVisible(true);
    }
  }, [isMounted, isOpen]);

  const handleAnimationEnd = () => {
    if (isVisible) {
      return;
    }

    setIsMounted(false);
    onClose();
  };

  useKeyPress(closeModal, [KeyCode.Esc]);
  useClickOutside(popupRef, closeModal, [popupRef]);

  useScrollLock(isMounted);

  useTrapFocus({
    id: isMounted ? 'dialog' : null,
    popupRef,
    enabled: isMounted,
  });

  useEffect(() => {
    const root = document.getElementById('root');

    if (!root) {
      return;
    }

    const children = Array.from(root.children);

    if (isMounted) {
      children.forEach((child) => {
        if (child !== popupRef.current) {
          child.setAttribute('inert', '');
        }
      });
    }

    return () => {
      children.forEach((child) => {
        child.removeAttribute('inert');
      });
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted && !isOpen) {
      triggerRef.current?.focus();
      triggerRef.current = null;
    }
  }, [isMounted, isOpen]);

  return {
    closeModal,
    handleAnimationEnd,
    isMounted,
    popupClass: isVisible ? 'is-visible' : 'dismissed',
    popupRef,
  };
};
