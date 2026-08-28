import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import NotFoundError from '../components/NotFoundError';
import ProgressTracker from '../components/progressTracker/ProgressTracker';
import SkeletonOrderDetailsPage from '../components/skeleton/skeletonOrderDetailsPage/SkeletonOrderDetailsPage';
import { useLanguage } from '../features/language/useLanguage';
import CancelledOrderInfo from '../features/orders/components/CancelledOrderInfo';
import MyOrderDetailList from '../features/orders/components/myOrderDetails/MyOrderDetailList';
import OrderAddressList from '../features/orders/components/OrderAddressList';
import OrderSummary from '../features/orders/components/OrderSummary';
import { useGetOrderByIdQuery } from '../features/orders/orderApiSlice';
import { createOrderAddressList } from '../features/orders/utils/createOrderAddressList';
import { orderTrackingList } from '../features/orders/utils/createTrackingList';
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const MyOrderDetailsPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();

  const {
    data: order,
    refetch,
    isError,
    error,
    isLoading,
  } = useGetOrderByIdQuery(id ?? '');

  const status = {
    status: order?.delivery.status ?? 'created',
  };

  const addressList = order
    ? createOrderAddressList({
        billingAddress: order.billingAddress,
        shippingAddress: order.shippingAddress,
      })
    : [];

  if (isError) {
    return (
      <NotFoundError
        error={error}
        btnLabel="viewOrders"
        path={ShopPath.MyOrder}
      />
    );
  }

  if (isLoading) {
    return (
      <MainPageContainer
        hideBreadCrumbs
        variant="large"
        heading={language.orderConfirmationTitle}
      >
        <SkeletonOrderDetailsPage />
      </MainPageContainer>
    );
  }

  return (
    <MainPageContainer
      hideBreadCrumbs
      variant="large"
      heading={`${order && order.user.username}, ${language.orderConfirmationTitle}`}
    >
      <div className="order-details-content">
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={refetch}
        >
          {order && (
            <>
              <CancelledOrderInfo
                language={language}
                status={order.delivery.status}
              />

              <ProgressTracker steps={orderTrackingList} status={status} />
              <OrderSummary language={language} order={order} />

              <section className="order-details-info-container">
                <MyOrderDetailList
                  createdAt={order.createdAt}
                  id={order.id}
                  method={order.payment.method}
                />

                <OrderAddressList addresses={addressList} refetch={refetch} />
              </section>
            </>
          )}
        </ErrorBoundary>
      </div>
    </MainPageContainer>
  );
};

export default MyOrderDetailsPage;
