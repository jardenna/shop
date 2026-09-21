import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useScrollLock } from '../../hooks/useScrollLock';
import { KeyCode } from '../../types/enums';
import Button from '../Button';
import Portal from '../Portal';
import { closeMiniCart, selectIsMiniCartOpen } from './popModalSlice';
import { useAnimate } from './useAnimate';

const PopModal = () => {
  const dispatch = useAppDispatch();
  const miniCartRef = useRef<HTMLUListElement>(null);

  const isMiniCartOpen = useAppSelector(selectIsMiniCartOpen);
  const shouldOpenMiniCart = isMiniCartOpen;

  const { shouldRender, transitionState } = useAnimate({
    isOpen: shouldOpenMiniCart,
  });

  const handleCloseMiniCart = () => {
    dispatch(closeMiniCart());
  };

  useKeyPress(handleCloseMiniCart, [KeyCode.Esc]);
  useScrollLock(shouldRender);

  useClickOutside(miniCartRef, handleCloseMiniCart, [miniCartRef]);

  return (
    <Portal portalId="newModal">
      <dialog className={`mini-cart transition ${transitionState}`}>
        This is my new modal
        <Button onClick={handleCloseMiniCart}>Luk</Button>
      </dialog>
    </Portal>
  );
};

export default PopModal;
