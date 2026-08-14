import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import NotFoundError from '../components/NotFoundError';
import ProgressTracker from '../components/progressTracker/ProgressTracker';
import SkeletonOrderConfirmationPage from '../components/skeleton/skeletonOrderConfirmationPage/SkeletonOrderConfirmationPage';
import SummaryList from '../features/cart/components/SummaryList';
import { useLanguage } from '../features/language/useLanguage';
import ConfirmationDetails from '../features/orders/components/confirmation/ConfirmationDetails';
import OrderAddressList from '../features/orders/components/OrderAddressList';
import OrderHeading from '../features/orders/components/orderHeading/OrderHeading';
import OrderList from '../features/orders/components/orders/OrderList';
import { useGetOrderByIdQuery } from '../features/orders/orderApiSlice';
import { createOrderAddressList } from '../features/orders/utils/createOrderAddressList';
import { orderTrackingList } from '../features/orders/utils/createTrackingList';
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const OrderConfirmationPage = () => {
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
        <SkeletonOrderConfirmationPage />
      </MainPageContainer>
    );
  }
  console.log(order?.delivery.status);

  return (
    <MainPageContainer
      hideBreadCrumbs
      variant="large"
      heading={`${order && order.user.username}, ${language.orderConfirmationTitle}`}
    >
      <div className="confirmation-content">
        <h2>{language.orderStatusMessage}</h2>
        <h2>{language.orderCancelled}</h2>

        <ProgressTracker steps={orderTrackingList} status={status} />

        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={refetch}
        >
          {order && (
            <>
              <section className="confirmation-summary">
                <article className="summary-items">
                  <OrderHeading heading={language.orderedItems} />

                  <OrderList orders={order.orderItems} language={language} />
                </article>

                <article className="summary-payment">
                  <OrderHeading heading={language.priceOverview} />
                  <SummaryList
                    language={language}
                    summary={order.summary}
                    promoDiscount={order.discount}
                  />
                </article>
              </section>
              <section className="confirmation-info-container">
                <ConfirmationDetails
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

export default OrderConfirmationPage;
