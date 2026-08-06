import { useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
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
import OrderItemList from '../../../orders/components/orderItemCard/OrderItemList';
import ProductPrice from '../../../shop/components/productPrice/ProductPrice';
import { useActiveCart } from '../../useActiveCart';
import SummaryItem from '../SummaryItem';
import './_mini-cart-popup.scss';

const MiniCartPopup = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectUser);
  const { language } = useLanguage();
  const currentUser = loggedInUser?.user ?? null;
  const { apiCartList, refetchApiCartList } = useActiveCart({
    currentUser,
  });
  const isMiniCartOpen = useAppSelector(selectIsMiniCartOpen);
  const { shouldRender, transitionState } = useAnimatedMount({
    isOpen: isMiniCartOpen,
    duration: 300,
  });

  const miniCartRef = useRef<HTMLUListElement>(null);

  const handleCloseMiniCart = () => {
    dispatch(closeMiniCart());
  };

  useKeyPress(handleCloseMiniCart, [KeyCode.Esc]);
  useScrollLock(shouldRender);

  useClickOutside(miniCartRef, () => {
    handleCloseMiniCart();
  }, [miniCartRef]);

  if (!apiCartList || !shouldRender) {
    return null;
  }
  const { cartItems, summary, discount } = apiCartList;
  const discountLabel = `${language[discount.label]} (${discount.percent}%)`;

  return (
    <Portal portalId="miniCard">
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetchApiCartList()}
      >
        <section
          className={`mini-cart transition ${transitionState}`}
          ref={miniCartRef}
        >
          <h2 className="mini-cart-title">{language.myBag}</h2>
          <OrderItemList orders={cartItems} language={language} />

          <article className="mini-cart-price-info">
            {summary.remainingForFreeShipping > 0 && (
              <div className="mini-cart-info">
                {language.buyForFreeShipping}
                <ProductPrice price={summary.remainingForFreeShipping} />
                {language.freeShippingSuffix}
              </div>
            )}

            <div className="mini-cart-summary-list">
              {summary.promoDiscount > 0 && (
                <SummaryItem
                  label={
                    discount.code === ''
                      ? language.employeeDiscount
                      : discountLabel
                  }
                  price={summary.promoDiscount}
                  isDiscount
                />
              )}
              <SummaryItem
                label={language.estimatedShipping}
                price={summary.shippingPrice}
              />
              <SummaryItem
                label={language.orderTotalInclVat}
                price={summary.totalPrice}
              />
            </div>
          </article>
        </section>
      </ErrorBoundary>
    </Portal>
  );
};

export default MiniCartPopup;
