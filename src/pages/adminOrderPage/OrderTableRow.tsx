import { paymentMethodLabels } from '../../app/api/apiConstants';
import { PaymentMethods } from '../../app/api/apiTypes/paymentApiTypes';
import { useAppSelector } from '../../app/hooks';
import Badge from '../../components/badge/Badge';
import DateDisplay from '../../components/datePicker/DateDisplay';
import { selectSelectedLanguage } from '../../features/language/languageSlice';
import { numberConvert } from '../../utils/numberConverter';

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
}: OrderTableRowProps) => {
  console.log({ linkText });
  const selectedLanguage = useAppSelector(selectSelectedLanguage);

  return (
    <tr>
      <td>{id}</td>
      <td>
        <DateDisplay date={createdAt} />
      </td>
      <td>{customer}</td>
      <td>{numberConvert(totalPrice, selectedLanguage)}</td>
      <td>{paymentMethodLabels[paymentMethod]}</td>
      <td>
        <Badge badgeText={paymentStatus} />
      </td>
      <td>
        <Badge badgeText={deliveryStatus} />
      </td>
    </tr>
  );
};

export default OrderTableRow;
