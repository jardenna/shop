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

  return (
    <Portal portalId="miniCard">
      <ul className="mini-cart" ref={miniCartRef}>
        {apiCartList.cartItems.map((order) => (
          <li key={order.id} className="mini-cart-item">
            <OrderItemCard order={order} language={language} />
          </li>
        ))}
        <div>
          {language.buyForFreeShipping}
          {apiCartList.summary.remainingForFreeShipping && (
            <ProductPrice
              price={apiCartList.summary.remainingForFreeShipping}
            />
          )}
          {language.freeShippingSuffix}
        </div>
        <LabelValueGrid text="orderTotal inclVat">
          <ProductPrice price={apiCartList.summary.totalPrice} />
        </LabelValueGrid>
      </ul>
    </Portal>
  );
};

export default MiniCartPopup;
