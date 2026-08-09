import { paymentMethodLabels } from '../../app/api/apiConstants';
import { DeliveryStatusFilterValues } from '../../app/api/apiTypes/orderApiTypes';
import { PaymentMethods } from '../../app/api/apiTypes/paymentApiTypes';
import Badge from '../../components/badge/Badge';
import DateDisplay from '../../components/datePicker/DateDisplay';
import ProductPrice from '../../features/shop/components/productPrice/ProductPrice';

interface OrderTableRowProps {
  createdAt: Date;
  customer: string;
  deliveryStatus: DeliveryStatusFilterValues;
  id: string;
  language: Record<string, string>;
  linkText: string;
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
  linkText,
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
    <td>{linkText}</td>
  </tr>
);
export default OrderTableRow;
