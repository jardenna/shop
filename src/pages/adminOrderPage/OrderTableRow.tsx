interface OrderTableRowProps {
  createdAt: string;
  customer: string;
  deliveryStatus: string;
  id: string;
  linkText: string;
  paymentMethod: string;
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

  return (
    <tr>
      <td>{id}</td>
      <td>{createdAt}</td>
      <td>{customer}</td>
      <td>{totalPrice}</td>
      <td>{paymentMethod}</td>
      <td>{paymentStatus}</td>
      <td>{deliveryStatus}</td>
    </tr>
  );
};

export default OrderTableRow;
