import { useNavigate } from 'react-router';
import { useLanguage } from '../features/language/useLanguage';
import MyOrderList from '../features/orders/components/orders/myOrders/MyOrderList';
import { useGetUserOrderQuery } from '../features/orders/orderApiSlice';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { data: myOrders } = useGetUserOrderQuery();

  const pageHeading = language.myOrders;

  const handleViewDetails = (id: string) => {
    navigate(`/${ShopPath.MyOrder}/${id}`);
  };

  if (myOrders?.length === 0) {
    return (
      <EmptyState
        emptyStateTitle={language.noOrdersYet}
        emptyStateText={language.noOrdersDescription}
        src="/images/shoppingBags/shopping_bag_2"
        linkTo={`/${ShopPath.Collection}`}
        emptyStateCtaText={language.getInspired}
        pageHeading={pageHeading}
      />
    );
  }
  return (
    <MainPageContainer variant="medium" heading={pageHeading}>
      <p>{language.viewAndTrackOrders}</p>
      <p>{language.whenOrderViewAndTrack}</p>

      {myOrders && (
        <MyOrderList myOrders={myOrders} onViewDetails={handleViewDetails} />
      )}
    </MainPageContainer>
  );
};

export default MyOrdersPage;
