import { MyOrdersResponse } from '../../../../app/api/apiTypes/orderApiTypes';
import { useLanguage } from '../../../language/useLanguage';
import OrderList from '../OrderList';
import './_my-orders.scss';
import MyOrderFooter from './MyOrderFooter';
import MyOrderHeader from './MyOrderHeader';

interface MyOrderListProps {
  myOrders: MyOrdersResponse[];
  onViewDetails: (id: string) => void;
}

const MyOrderList = ({ myOrders, onViewDetails }: MyOrderListProps) => {
  const { language } = useLanguage();

  return (
    <section className="orders">
      {myOrders.map((myOrder) => (
        <article key={myOrder.id} className="my-order-cart">
          <MyOrderHeader
            language={language}
            totalPrice={myOrder.summary.totalPrice}
            orderId={myOrder.id}
            orderStatus={myOrder.delivery.status}
          />

          <OrderList orders={myOrder.orderItems} language={language} />
          <MyOrderFooter
            language={language}
            orderStatus={myOrder.delivery.status}
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

export default MyOrderList;
