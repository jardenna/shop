import { Delivery } from '../../../../../app/api/apiTypes/orderApiTypes';
import Badge from '../../../../../components/badge/Badge';
import { formatOrderNumber } from '../../../../../utils/formatOrderNo';
import ProductPrice from '../../../../shop/components/productPrice/ProductPrice';

interface MyOrderHeaderProps {
  delivery: Delivery;
  language: Record<string, string>;
  orderId: string;
  totalPrice: number;
}

const MyOrderHeader = ({
  orderId,
  totalPrice,
  language,
  delivery,
}: MyOrderHeaderProps) => (
  <header className="my-order-header">
    <div className="my-order-meta">
      <span>
        <span>{language.order}</span> <span>{formatOrderNumber(orderId)}</span>
      </span>
      <Badge
        badgeText={language[delivery.status]}
        className={delivery.status === 'cancelled' ? 'cancelled' : ''}
      />
    </div>
    <ProductPrice
      price={totalPrice}
      cancelled={delivery.status === 'cancelled'}
    />
  </header>
);
export default MyOrderHeader;
