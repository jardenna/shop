import { DeliveryStatus } from '../../../../../app/api/apiTypes/orderApiTypes';
import Badge from '../../../../../components/badge/Badge';
import { formatOrderNumber } from '../../../../../utils/formatOrderNo';
import ProductPrice from '../../../../shop/components/productPrice/ProductPrice';

interface MyOrderHeaderProps {
  language: Record<string, string>;
  orderId: string;
  orderStatus: DeliveryStatus;
  totalPrice: number;
}

const MyOrderHeader = ({
  orderId,
  totalPrice,
  language,
  orderStatus,
}: MyOrderHeaderProps) => (
  <header className="my-order-header">
    <div className="my-order-meta">
      <span>
        <span>{language.order}</span> <span>{formatOrderNumber(orderId)}</span>
      </span>
      <Badge
        badgeText={language[orderStatus]}
        className={orderStatus === 'cancelled' ? 'cancelled' : ''}
      />
    </div>
    <ProductPrice price={totalPrice} cancelled={orderStatus === 'cancelled'} />
  </header>
);
export default MyOrderHeader;
