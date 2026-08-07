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
      <Badge badgeText={paymentStatus} />
    </td>
    <td>
      <Badge badgeText={deliveryStatus} />
    </td>
    <td>{linkText}</td>
  </tr>
);

export default OrderTableRow;
