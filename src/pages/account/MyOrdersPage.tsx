import { useLanguage } from '../../features/language/useLanguage';
import OrderItemList from '../../features/orders/components/orderItemCard/OrderItemList';
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
              <article>
                <OrderItemList
                  orders={cart.orderItems}
                  language={language}
                  key={cart.id}
                />
              </article>
            </li>
          ))}
        </ul>
      )}
    </MainPageContainer>
  );
};

export default MyOrdersPage;
