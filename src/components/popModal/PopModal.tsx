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

interface PopModalProps {
  children: React.ReactNode;
}

interface PopModalProps {
  children: React.ReactNode;
}

const PopModal = ({ children }: PopModalProps) => {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

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
      <div
        ref={modalRef}
        className={`pop-modal transition ${transitionState}`}
        onTransitionEnd={handleTransitionEnd}
      >
        {children}
      </div>
    </Portal>
  );
};
export default PopModal;
