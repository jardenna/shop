import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import Button from '../../../../components/Button';
import ErrorBoundaryFallback from '../../../../components/ErrorBoundaryFallback';
import Panel from '../../../../components/panel/Panel';
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

const MiniCartPopup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loggedInUser = useAppSelector(selectUser);
  const { language } = useLanguage();
  const currentUser = loggedInUser?.user ?? null;

  const { cartData, isFetching, refetchCart } = useActiveCart({
    currentUser,
    isAuthReady: true,
  });

  const isMiniCartOpen = useAppSelector(selectIsMiniCartOpen);
  const shouldOpenMiniCart = isMiniCartOpen && !isFetching;

  const { shouldRender } = useAnimate({
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
    <Panel
      className="mini-cart"
      onClosePanel={handleCloseMiniCart}
      isPanelShown={shouldOpenMiniCart}
    >
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetchCart()}
      >
        <h2 className="mini-cart-title">{language.myBag}</h2>
        <MiniCartInfo
          remainingForFreeShipping={summary.remainingForFreeShipping}
          language={language}
        />
        <OrderList orders={cartItems} language={language} />
        <TotalPrice price={summary.totalPrice} />
        <Button onClick={handleGoToCart}>{language.bag}</Button>
      </ErrorBoundary>
    </Panel>
  );
};

export default MiniCartPopup;
