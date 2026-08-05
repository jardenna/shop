import { useLanguage } from '../features/language/useLanguage';
import MyOrders from '../features/orders/components/myOrders/MyOrders';
import { useGetUserOrderQuery } from '../features/orders/orderApiSlice';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const MyOrdersPage = () => {
  const { language } = useLanguage();
  const { data: myOrders } = useGetUserOrderQuery();

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

      {myOrders && <MyOrders myOrders={myOrders} />}
    </MainPageContainer>
  );
};

export default MyOrdersPage;
