import { ReactNode, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useScrollLock } from '../../hooks/useScrollLock';
import { KeyCode } from '../../types/enums';
import Overlay from '../overlay/Overlay';
import Portal from '../Portal';
import './_mini-cart-popup.scss';
import { closeModal, selectModalId } from './popModalSlice';
import { useAnimate } from './useAnimate';

interface PopModalProps {
  children: ReactNode;
  modalId: string;
}

const PopModal = ({ children, modalId }: PopModalProps) => {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDialogElement>(null);

  const currentModalId = useAppSelector(selectModalId);

  const isModalOpen = currentModalId === modalId;

  const { shouldRender, transitionState, handleTransitionEnd } = useAnimate({
    isOpen: isModalOpen,
  });

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  useKeyPress(handleCloseModal, [KeyCode.Esc]);
  useScrollLock(shouldRender);
  useClickOutside(modalRef, handleCloseModal, [modalRef]);

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
