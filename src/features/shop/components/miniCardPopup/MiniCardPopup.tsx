import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import Button from '../../../../components/Button';
import ErrorBoundaryFallback from '../../../../components/ErrorBoundaryFallback';
import Panel from '../../../../components/panel/Panel';
import TotalPrice from '../../../../components/TotalPrice';
import { useAnimate } from '../../../../hooks/useAnimate';
import { ShopPath } from '../../../../layout/nav/navConstants';
import { selectUser } from '../../../auth/authSlice';
import { useActiveCart } from '../../../cart/useActiveCart';
import { useLanguage } from '../../../language/useLanguage';
import {
  closeMiniCard,
  selectIsMiniCardOpen,
} from '../../../miniCardPopupSlice';
import OrderList from '../../../orders/components/orderList/OrderList';
import './_mini-card-popup.scss';
import MiniCardInfo from './MiniCardInfo';

const MiniCardPopup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loggedInUser = useAppSelector(selectUser);
  const { language } = useLanguage();
  const currentUser = loggedInUser?.user ?? null;

  const { cartData, isFetching, refetchCart } = useActiveCart({
    currentUser,
    isAuthReady: true,
  });

  const isMiniCardOpen = useAppSelector(selectIsMiniCardOpen);
  const shouldOpenMiniCard = isMiniCardOpen && !isFetching;

  const { shouldRender } = useAnimate({
    isOpen: shouldOpenMiniCard,
  });

  const handleCloseMiniCard = () => {
    dispatch(closeMiniCard());
  };

  const handleGoToCard = () => {
    navigate(`/${ShopPath.ShoppingCart}`);
  };

  if (!cartData || !shouldRender) {
    return null;
  }

  const { cartItems, summary } = cartData;

  return (
    <Panel
      className="mini-card"
      closePanel={handleCloseMiniCard}
      isPanelShown={shouldOpenMiniCard}
      portalId="mini-card"
      heading={language.myBag}
    >
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetchCart()}
      >
        <MiniCardInfo
          remainingForFreeShipping={summary.remainingForFreeShipping}
          language={language}
        />
        <OrderList orders={cartItems} language={language} />
        <TotalPrice price={summary.totalPrice} />
        <Button onClick={handleGoToCard}>{language.bag}</Button>
      </ErrorBoundary>
    </Panel>
  );
};

export default MiniCardPopup;
