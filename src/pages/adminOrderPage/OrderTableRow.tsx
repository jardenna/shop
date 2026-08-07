import { paymentMethodLabels } from '../../app/api/apiConstants';
import { PaymentMethods } from '../../app/api/apiTypes/paymentApiTypes';
import Badge from '../../components/badge/Badge';
import DateDisplay from '../../components/datePicker/DateDisplay';
import ProductPrice from '../../features/shop/components/productPrice/ProductPrice';

interface OrderTableRowProps {
  createdAt: string;
  customer: string;
  deliveryStatus: string;
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
    <td>{id}</td>
    <td>
      <DateDisplay date={createdAt} />
    </td>
    <td>{customer}</td>
    <td>
      <ProductPrice price={totalPrice} />
    </td>
    <td>{paymentMethodLabels[paymentMethod]}</td>
    <td>
      <Badge badgeText={paymentStatus} className={paymentStatus} />
    </td>
    <td>
      <Badge badgeText={language[deliveryStatus]} className={deliveryStatus} />
    </td>
    <td>{linkText}</td>
  </tr>
);
export default OrderTableRow;
