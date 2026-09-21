import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useScrollLock } from '../../hooks/useScrollLock';
import { KeyCode } from '../../types/enums';
import Portal from '../Portal';
import './_mini-cart-popup.scss';
import { closeModal, selectIsModalOpen } from './popModalSlice';
import { useAnimate } from './useAnimate';
import Overlay from '../overlay/Overlay';

interface PopModalProps {
  children: React.ReactNode;
}

interface PopModalProps {
  children: React.ReactNode;
}

const PopModal = ({ children }: PopModalProps) => {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDialogElement>(null);

  const isModalOpen = useAppSelector(selectIsModalOpen);

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
