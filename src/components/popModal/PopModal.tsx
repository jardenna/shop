import { ReactNode, useRef } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useScrollLock } from '../../hooks/useScrollLock';
import { KeyCode } from '../../types/enums';
import Overlay from '../overlay/Overlay';
import Portal from '../Portal';
import './_mini-cart-popup.scss';
import { selectModalId } from './popModalSlice';
import { useAnimate } from './useAnimate';
import { usePopModal } from './usePopModal';
import { useTrapPopFocus } from './useTrapPopFocus';

interface PopModalProps {
  children: ReactNode;
  modalId: string;
}

const PopModal = ({ children, modalId }: PopModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const currentModalId = useAppSelector(selectModalId);

  const isModalOpen = currentModalId === modalId;

  const { shouldRender, transitionState, handleTransitionEnd } = useAnimate({
    isOpen: isModalOpen,
  });

  const { closeModal } = usePopModal();

  useKeyPress(closeModal, [KeyCode.Esc]);
  useScrollLock(shouldRender);
  useClickOutside(modalRef, closeModal, [modalRef]);
  useTrapPopFocus({
    popupRef: modalRef,
    enabled: shouldRender,
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <Portal portalId="newModal">
      <dialog
        ref={modalRef}
        className={`pop-modal transition ${transitionState}`}
        onTransitionEnd={handleTransitionEnd}
      >
        {children}
      </dialog>

      <Overlay />
    </Portal>
  );
};
export default PopModal;
