import LabelValueGrid from '../../../../components/labelValueGrid/LabelValueGrid';
import { useAuth } from '../../../auth/hooks/useAuth';
import { useLanguage } from '../../../language/useLanguage';
import ProductPrice from '../../../shop/components/productPrice/ProductPrice';
import { useActiveCart } from '../../useActiveCart';
import OrderItemCard from '../orderItemCard/OrderItemCard';
import './_mini-cart-popup.scss';

const MiniCartPopup = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const { apiCartList } = useActiveCart({ currentUser });

  return (
    apiCartList && (
      <ul className="favorite-list">
        {apiCartList.cartItems.map((order) => (
          <li key={order.id} className="favorite-list-item">
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
    )
  );
};

export default MiniCartPopup;
