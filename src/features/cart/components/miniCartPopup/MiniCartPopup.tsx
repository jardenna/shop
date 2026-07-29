import LabelValueGrid from '../../../../components/labelValueGrid/LabelValueGrid';
import { useAuth } from '../../../auth/hooks/useAuth';
import FavoriteCartItem from '../../../favorites/components/FavoriteCartItem';
import { useLanguage } from '../../../language/useLanguage';
import ProductPrice from '../../../shop/components/productPrice/ProductPrice';
import { useActiveCart } from '../../useActiveCart';

const MiniCartPopup = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const { apiCartList } = useActiveCart({ currentUser });

  return (
    apiCartList && (
      <ul className="favorite-list">
        {apiCartList.cartItems.map((order) => (
          <li key={order.id} className="favorite-list-item">
            <FavoriteCartItem order={order} language={language} />
          </li>
        ))}
        <div>
          Hvis du køber for
          <ProductPrice price={apiCartList.summary.remainingForFreeShipping} />
          mere er levering gratis
        </div>
        <LabelValueGrid text="Pris i alt inkl. moms">
          <ProductPrice price={apiCartList.summary.totalPrice} />
        </LabelValueGrid>
      </ul>
    )
  );
};

export default MiniCartPopup;
