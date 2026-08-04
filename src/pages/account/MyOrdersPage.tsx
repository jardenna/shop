import { useLanguage } from '../../features/language/useLanguage';
import MyOrderItem from '../../features/orders/components/MyOrderItem';
import { useGetUserOrderQuery } from '../../features/orders/orderApiSlice';
import MainPageContainer from '../pageContainer/MainPageContainer';

const MyOrdersPage = () => {
  const { language } = useLanguage();
  const { data: myOrders } = useGetUserOrderQuery();
  console.log(myOrders);

  return (
    <MainPageContainer variant="medium" heading={language.myOrders}>
      <p>{language.viewAndTrackOrders}</p>
      <p>{language.whenOrderViewAndTrack}</p>

      {myOrders && (
        <ul className="order-flow-list">
          {myOrders.map((cart) => (
            <li key={cart.id} className="order-flow-list-item">
              {cart.orderItems.map((order) => (
                <MyOrderItem key={order.id} order={order} language={language} />
              ))}
            </li>
          ))}
        </ul>
      )}
    </MainPageContainer>
  );
};

export default MyOrdersPage;
