import { DeliveryStatus } from '../../../../app/api/apiTypes/orderApiTypes';
import Chip from '../../../../components/chips/Chip';
import { chipVariants } from '../../../../components/chips/chipsUtils';
import { formatOrderNumber } from '../../../../utils/formatOrderNo';
import ProductPrice from '../../../shop/components/productPrice/ProductPrice';

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
  <div className="my-order-header">
    <div>
      <span>
        <span>{language.order}</span> <span>{formatOrderNumber(orderId)}</span>
      </span>
      <Chip
        chipText={language[orderStatus]}
        variant={chipVariants[orderStatus]}
      />
    </div>
    <ProductPrice price={totalPrice} cancelled={orderStatus === 'cancelled'} />
  </div>
);
export default MyOrderHeader;
