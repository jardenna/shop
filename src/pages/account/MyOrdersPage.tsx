import { useLanguage } from '../../features/language/useLanguage';
import MyOrderItem from '../../features/orders/components/myOrders/MyOrderItem';
import { useGetUserOrderQuery } from '../../features/orders/orderApiSlice';
import EmptyState from '../../features/shop/components/emptyState/EmptyState';
import { ShopPath } from '../../layout/nav/enums';
import MainPageContainer from '../pageContainer/MainPageContainer';

const MyOrdersPage = () => {
  const { language } = useLanguage();
  const { data: myOrders } = useGetUserOrderQuery();
  console.log(myOrders);

  const pageHeading = language.myOrders;

  if (myOrders?.length === 0) {
    return (
      <EmptyState
        noProductText={language.shoppingBagEmpty}
        noProductTitle={language.shoppingBagEmptyTitle}
        src="/images/shoppingBags/shopping_bag_2"
        linkTo={`/${ShopPath.Collection}`}
        emtyStateCtaText={language.getInspired}
        pageHeading={pageHeading}
      />
    );
  }
  return (
    <MainPageContainer variant="medium" heading={pageHeading}>
      <p>{language.viewAndTrackOrders}</p>
      <p>{language.whenOrderViewAndTrack}</p>

      {myOrders && (
        <ul>
          {myOrders.map((cart) => (
            <li key={cart.id}>
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
