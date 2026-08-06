import Badge from '../../../../components/badge/Badge';
import { formatOrderNumber } from '../../../../utils/formatOrderNo';
import ProductPrice from '../../../shop/components/productPrice/ProductPrice';

interface MyOrderHeaderProps {
  language: Record<string, string>;
  orderId: string;
  totalPrice: number;
}

const MyOrderHeader = ({
  orderId,
  totalPrice,
  language,
}: MyOrderHeaderProps) => (
  <header className="my-order-header">
    <div className="my-order-meta">
      <span>
        <span>{language.order}</span> <span>{formatOrderNumber(orderId)}</span>
      </span>
      <Badge variant="small" badgeText={language.orderCreated} />
    </div>
    <ProductPrice price={totalPrice} />
  </header>
);

export default MyOrderHeader;
