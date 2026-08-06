import { MyOrdersResponse } from '../../../../app/api/apiTypes/orderApiTypes';
import { useLanguage } from '../../../language/useLanguage';
import MyOrderFooter from './MyOrderFooter';
import MyOrderHeader from './MyOrderHeader';
import MyOrderList from './MyOrderList';
import './_my-order.scss';

interface MyOrdersProps {
  myOrders: MyOrdersResponse[];
  onViewDetails: (id: string) => void;
}

const MyOrders = ({ myOrders, onViewDetails }: MyOrdersProps) => {
  const { language } = useLanguage();

  return (
    <section className="my-orders">
      {myOrders.map((myOrder) => (
        <article key={myOrder.id} className="my-order-card">
          <MyOrderHeader
            language={language}
            totalPrice={myOrder.summary.totalPrice}
            orderId={myOrder.id}
          />
          <MyOrderList orders={myOrder.orderItems} language={language} />
          <MyOrderFooter
            language={language}
            estimatedDelivery={myOrder.createdAt}
            onViewDetails={() => {
              onViewDetails(myOrder.id);
            }}
          />
        </article>
      ))}
    </section>
  );
};

export default MyOrders;
