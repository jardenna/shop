import LabelValueGrid from '../../../../components/labelValueGrid/LabelValueGrid';
import { useAuth } from '../../../auth/hooks/useAuth';
import FavoriteCartItem from '../../../favorites/components/FavoriteCartItem';
import { useLanguage } from '../../../language/useLanguage';
import { useActiveCart } from '../../useActiveCart';

const MiniCartPopup = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const { apiCartList } = useActiveCart({ currentUser });

  return (
    apiCartList && (
      <ul>
        {apiCartList.cartItems.map((order) => (
          <li key={order.id} className="favorite-list-item">
            <FavoriteCartItem order={order} language={language} />
          </li>
        ))}
        <p>Hvis du køber for 875, 45 kr. mere er levering gratis</p>

        <LabelValueGrid text="Pris i alt inkl. moms">300,00 kr.</LabelValueGrid>
      </ul>
    )
  );
};

export default MiniCartPopup;
