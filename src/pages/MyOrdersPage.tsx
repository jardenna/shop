import { useNavigate } from 'react-router';
import SkeletonMyOrderPage from '../components/skeleton/skeletonMyOrderPage/SkeletonMyOrderPage';
import { useLanguage } from '../features/language/useLanguage';
import MyOrderFooter from '../features/orders/components/myOrderDetails/MyOrderFooter';
import MyOrderHeader from '../features/orders/components/myOrderDetails/MyOrderHeader';
import OrderList from '../features/orders/components/OrderList';
import { useGetUserOrderQuery } from '../features/orders/orderApiSlice';
import EmptyState from '../features/shop/components/emptyState/EmptyState';
import { ShopPath } from '../layout/nav/enums';
import './MyOrdersPage.styles.scss';
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
      <SkeletonMyOrderPage />
      <p>{language.viewAndTrackOrders}</p>
      <p>{language.whenOrderViewAndTrack}</p>

      {myOrders && (
        <section className="my-orders-page">
          {myOrders.map((myOrder) => (
            <article key={myOrder.id} className="my-orders-page-cart">
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
                  handleViewDetails(myOrder.id);
                }}
              />
            </article>
          ))}
        </section>
      )}
    </MainPageContainer>
  );
};

export default MyOrdersPage;
