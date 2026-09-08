import { useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import Button from '../../../../components/Button';
import ErrorBoundaryFallback from '../../../../components/ErrorBoundaryFallback';
import Portal from '../../../../components/Portal';
import { useAnimatedMount } from '../../../../components/transition/useAnimatedMount';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import { useKeyPress } from '../../../../hooks/useKeyPress';
import { useScrollLock } from '../../../../hooks/useScrollLock';
import { KeyCode } from '../../../../types/enums';
import { selectUser } from '../../../auth/authSlice';
import { useLanguage } from '../../../language/useLanguage';
import {
  closeMiniCart,
  selectIsMiniCartOpen,
} from '../../../miniCartPopupSlice';
import OrderList from '../../../orders/components/OrderList';
import TotalPrice from '../../../orders/components/TotalPrice';
import { useActiveCart } from '../../useActiveCart';
import './_mini-cart-popup.scss';
import MiniCartInfo from './MiniCartInfo';

interface MiniCartPopupProps {
  gotoCart: () => void;
}

const MiniCartPopup = ({ gotoCart }: MiniCartPopupProps) => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectUser);
  const { language } = useLanguage();
  const currentUser = loggedInUser?.user ?? null;

  const { apiCartList, isFetching, refetchCart } = useActiveCart({
    currentUser,
    isAuthReady: true,
  });

  const isMiniCartOpen = useAppSelector(selectIsMiniCartOpen);
  const shouldOpenMiniCart = isMiniCartOpen && !isFetching;

  const { shouldRender, transitionState } = useAnimatedMount({
    isOpen: shouldOpenMiniCart,
    duration: 300,
  });

  const miniCartRef = useRef<HTMLUListElement>(null);

  const handleCloseMiniCart = () => {
    dispatch(closeMiniCart());
  };

  useKeyPress(handleCloseMiniCart, [KeyCode.Esc]);
  useScrollLock(shouldRender);

  useClickOutside(miniCartRef, handleCloseMiniCart, [miniCartRef]);

  if (!apiCartList || !shouldRender) {
    return null;
  }

  const { cartItems, summary } = apiCartList;

  return (
    <Portal portalId="miniCart">
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetchCart()}
      >
        <section
          className={`mini-cart transition ${transitionState}`}
          ref={miniCartRef}
        >
          <h2 className="mini-cart-title">{language.myBag}</h2>
          <MiniCartInfo
            remainingForFreeShipping={summary.remainingForFreeShipping}
            language={language}
          />

          <OrderList orders={cartItems} language={language} />
          <TotalPrice price={summary.totalPrice} />
          <Button onClick={gotoCart}>{language.bag}</Button>
        </section>
      </ErrorBoundary>
    </Portal>
  );
};

export default MiniCartPopup;
