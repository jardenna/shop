import { useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import BtnClose from '../../../../components/BtnClose';
import Button from '../../../../components/Button';
import ErrorBoundaryFallback from '../../../../components/ErrorBoundaryFallback';
import { useAnimate } from '../../../../hooks/useAnimate';
import { ShopPath } from '../../../../layout/nav/enums';
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
import PanelPopup from './PanelPopup';

const MiniCartPopup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loggedInUser = useAppSelector(selectUser);
  const { language } = useLanguage();
  const currentUser = loggedInUser?.user ?? null;
  const miniCartRef = useRef<HTMLUListElement>(null);

  const { cartData, isFetching, refetchCart } = useActiveCart({
    currentUser,
    isAuthReady: true,
  });

  const isMiniCartOpen = useAppSelector(selectIsMiniCartOpen);
  const shouldOpenMiniCart = isMiniCartOpen && !isFetching;

  const { shouldRender, transitionState } = useAnimate({
    isOpen: shouldOpenMiniCart,
  });

  const handleCloseMiniCart = () => {
    dispatch(closeMiniCart());
  };

  const handleGoToCart = () => {
    navigate(`/${ShopPath.ShoppingCart}`);
  };

  if (!cartData || !shouldRender) {
    return null;
  }

  const { cartItems, summary } = cartData;

  return (
    <PanelPopup
      className="mini-cart"
      onClosePanel={handleCloseMiniCart}
      isOpen={shouldOpenMiniCart}
    >
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetchCart()}
      >
        <section
          className={`mini-cart transition from-right ${transitionState}`}
          ref={miniCartRef}
        >
          <h2 className="mini-cart-title">{language.myBag}</h2>
          <BtnClose onClick={handleCloseMiniCart} />
          <MiniCartInfo
            remainingForFreeShipping={summary.remainingForFreeShipping}
            language={language}
          />
          <OrderList orders={cartItems} language={language} />
          <TotalPrice price={summary.totalPrice} />
          <Button onClick={handleGoToCart}>{language.bag}</Button>
        </section>
      </ErrorBoundary>
    </PanelPopup>
  );
};

export default MiniCartPopup;
