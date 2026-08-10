import { MyOrdersResponse } from '../../../../../app/api/apiTypes/orderApiTypes';
import { useLanguage } from '../../../../language/useLanguage';
import OrderList from '../OrderList';
import './_my-orders.scss';
import MyOrderFooter from './MyOrderFooter';
import MyOrderHeader from './MyOrderHeader';

interface MyOrdersProps {
  myOrders: MyOrdersResponse[];
  onViewDetails: (id: string) => void;
}

const MyOrders = ({ myOrders, onViewDetails }: MyOrdersProps) => {
  const { language } = useLanguage();

  return (
    <section className="orders">
      {myOrders.map((myOrder) => (
        <article key={myOrder.id} className="order-cart">
          <MyOrderHeader
            language={language}
            totalPrice={myOrder.summary.totalPrice}
            orderId={myOrder.id}
          />

          <OrderList orders={myOrder.orderItems} language={language} />
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
