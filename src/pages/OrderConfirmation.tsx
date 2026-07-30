import { useParams } from 'react-router';
import { useGetOrderByIdQuery } from '../features/orders/orderApiSlice';

const OrderConfirmation = () => {
  const { id } = useParams();

  const { data: order } = useGetOrderByIdQuery(id ?? '');
  console.log(order);

  return <section>kk</section>;
};

export default OrderConfirmation;
