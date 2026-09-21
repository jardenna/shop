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
  const shouldOpenMiniCart = isModalOpen;

  const { shouldRender, transitionState } = useAnimate({
    isOpen: shouldOpenMiniCart,
  });

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  useKeyPress(handleCloseModal, [KeyCode.Esc]);
  useScrollLock(shouldRender);

  useClickOutside(miniCartRef, handleCloseModal, [miniCartRef]);

  return (
    <Portal portalId="newModal">
      <div className={`pop-modal transition ${transitionState}`}>
        This is my new modal
        <Button onClick={handleCloseModal}>Luk</Button>
      </div>
    </Portal>
  );
};

export default PopModal;
