import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useScrollLock } from '../../hooks/useScrollLock';
import { KeyCode } from '../../types/enums';
import Button from '../Button';
import Portal from '../Portal';
import './_mini-cart-popup.scss';
import { closeModal, selectIsModalOpen } from './popModalSlice';
import { useAnimate } from './useAnimate';

const PopModal = () => {
  const dispatch = useAppDispatch();
  const miniCartRef = useRef<HTMLUListElement>(null);

  const isModalOpen = useAppSelector(selectIsModalOpen);

  const { shouldRender, transitionState, handleTransitionEnd } = useAnimate({
    isOpen: isModalOpen,
  });

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  useKeyPress(handleCloseModal, [KeyCode.Esc]);
  useScrollLock(shouldRender);

  useClickOutside(miniCartRef, handleCloseModal, [miniCartRef]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Portal portalId="newModal">
      <div
        className={`pop-modal transition ${transitionState}`}
        onTransitionEnd={handleTransitionEnd}
      >
        This is my new modal
        <Button onClick={handleCloseModal}>Luk</Button>
      </div>
    </Portal>
  );
};
export default PopModal;
