import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import LabelValueGrid from '../../../../components/labelValueGrid/LabelValueGrid';
import Portal from '../../../../components/Portal';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import { useKeyPress } from '../../../../hooks/useKeyPress';
import { KeyCode } from '../../../../types/enums';
import { selectUser } from '../../../auth/authSlice';
import { useLanguage } from '../../../language/useLanguage';
import {
  closeMiniCart,
  selectIsMiniCartOpen,
} from '../../../miniCartPopupSlice';
import ProductPrice from '../../../shop/components/productPrice/ProductPrice';
import { useActiveCart } from '../../useActiveCart';
import OrderItemCard from '../orderItemCard/OrderItemCard';
import './_mini-cart-popup.scss';

const MiniCartPopup = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectUser);
  const { language } = useLanguage();
  const currentUser = loggedInUser?.user ?? null;
  const { apiCartList } = useActiveCart({ currentUser });
  const isMiniCartOpen = useAppSelector(selectIsMiniCartOpen);

  const miniCartRef = useRef<HTMLUListElement>(null);

  const handleCloseMiniCart = () => {
    dispatch(closeMiniCart());
  };

  useKeyPress(handleCloseMiniCart, [KeyCode.Esc]);

  useClickOutside(miniCartRef, () => {
    handleCloseMiniCart();
  }, [miniCartRef]);

  if (!apiCartList || !isMiniCartOpen) {
    return null;
  }

  const { cartItems, summary } = apiCartList;

  return (
    <Portal portalId="miniCard">
      <section className="mini-cart message-popup-list">
        <h2 className="mini-cart-title">Din indkøbskurv</h2>
        <ul className="mini-cart-list animate-top-right" ref={miniCartRef}>
          {cartItems.map((order) => (
            <li key={order.id} className="mini-cart-item">
              <OrderItemCard order={order} language={language} />
            </li>
          ))}
        </ul>
        {summary.remainingForFreeShipping > 0 && (
          <div className="mini-cart-info">
            {language.buyForFreeShipping}
            <ProductPrice price={summary.remainingForFreeShipping} />
            {language.freeShippingSuffix}
          </div>
        )}
        <LabelValueGrid text={language.orderTotalInclVat}>
          <ProductPrice price={summary.totalPrice} />
        </LabelValueGrid>
      </section>
    </Portal>
  );
};

export default MiniCartPopup;
