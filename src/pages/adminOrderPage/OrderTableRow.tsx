import { paymentMethodLabels } from '../../app/api/apiConstants';
import { DeliveryStatus } from '../../app/api/apiTypes/orderApiTypes';
import { PaymentMethods } from '../../app/api/apiTypes/paymentApiTypes';
import Badge from '../../components/badge/Badge';
import DateDisplay from '../../components/datePicker/DateDisplay';
import MoreLink from '../../components/MoreLink';
import ProductPrice from '../../features/shop/components/productPrice/ProductPrice';
import { AdminPath } from '../../layout/nav/enums';

interface OrderTableRowProps {
  createdAt: Date;
  customer: string;
  deliveryStatus: DeliveryStatus;
  id: string;
  language: Record<string, string>;
  paymentMethod: PaymentMethods;
  paymentStatus: string;
  totalPrice: number;
}

const OrderTableRow = ({
  customer,
  deliveryStatus,
  paymentMethod,
  paymentStatus,
  totalPrice,
  createdAt,
  id,
  language,
}: OrderTableRowProps) => (
  <tr>
    <td>
      <span className="text-ellipsis">{id}</span>
    </td>
    <td className="text-no-wrap">
      <DateDisplay date={createdAt} />
    </td>
    <td className="text-no-wrap">{customer}</td>
    <td>
      <ProductPrice price={totalPrice} />
    </td>
    <td>{paymentMethodLabels[paymentMethod]}</td>
    <td>
      <Badge
        badgeText={language[paymentStatus.toLowerCase()]}
        className={paymentStatus}
      />
    </td>
    <td>
      <Badge badgeText={language[deliveryStatus]} className={deliveryStatus} />
    </td>
    <td>
      <MoreLink
        linkText={
          deliveryStatus === 'cancelled' || deliveryStatus === 'delivered'
            ? language.viewOrder
            : language.updateOrder
        }
        linkTo={`${AdminPath.AdminOrderById}/${id}`}
      />
    </td>
  </tr>
);

export default OrderTableRow;
