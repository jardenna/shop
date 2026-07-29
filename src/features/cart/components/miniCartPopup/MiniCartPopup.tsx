import { useAppSelector } from '../../../../app/hooks';
import LabelValueGrid from '../../../../components/labelValueGrid/LabelValueGrid';
import Portal from '../../../../components/Portal';
import { selectUser } from '../../../auth/authSlice';
import { useLanguage } from '../../../language/useLanguage';
import { selectIsMiniCartOpen } from '../../../miniCartPopupSlice';
import ProductPrice from '../../../shop/components/productPrice/ProductPrice';
import { useActiveCart } from '../../useActiveCart';
import OrderItemCard from '../orderItemCard/OrderItemCard';
import './_mini-cart-popup.scss';

const MiniCartPopup = () => {
  const { language } = useLanguage();
  const loggedInUser = useAppSelector(selectUser);
  const currentUser = loggedInUser?.user ?? null;
  const { apiCartList } = useActiveCart({ currentUser });
  const isMiniCartOpen = useAppSelector(selectIsMiniCartOpen);

  if (!apiCartList || !isMiniCartOpen) {
    return null;
  }

  return (
    <Portal portalId="miniCard">
      <ul className="mini-cart">
        {apiCartList.cartItems.map((order) => (
          <li key={order.id} className="mini-cart-item">
            <OrderItemCard order={order} language={language} />
          </li>
        ))}
        <div>
          {language.buyForFreeShipping}
          <ProductPrice price={apiCartList.summary.remainingForFreeShipping} />
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
