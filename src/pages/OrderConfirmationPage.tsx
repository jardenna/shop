import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import SkeletonOrderConfirmationPage from '../components/skeleton/skeletonOrderConfirmationPage/SkeletonOrderConfirmationPage';
import StatusTracker from '../components/statusTracker/StatusTracker';
import SummaryList from '../features/cart/components/SummaryList';
import { useLanguage } from '../features/language/useLanguage';
import ConfirmationDetails from '../features/orders/components/confirmation/ConfirmationDetails';
import ConfirmationSubHeader from '../features/orders/components/confirmation/ConfirmationSubHeader';
import OrderAddressList from '../features/orders/components/OrderAddressList';
import OrderItemList from '../features/orders/components/orderItemCard/OrderItemList';
import { useGetOrderByIdQuery } from '../features/orders/orderApiSlice';
import { createOrderAddressList } from '../features/orders/utils/createOrderAddressList';
import { orderTrackingList } from '../features/orders/utils/createTrackingList';
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
      <ErrorBoundaryFallback
        error={error}
        btnLabel={language.viewMyOrders}
        resetErrorBoundary={() => {
          refetch();
        }}
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

  return (
    <MainPageContainer
      hideBreadCrumbs
      variant="large"
      heading={`${order && order.user.username}, ${language.orderConfirmationTitle}`}
    >
      <div className="confirmation-content">
        <ConfirmationSubHeader />

        <StatusTracker steps={orderTrackingList} status={status} />

        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={refetch}
        >
          {order && (
            <>
              <section className="confirmation-summary">
                <article className="summary-items">
                  <h2 className="order-flow-title">{language.orderedItems}</h2>
                  <OrderItemList
                    orders={order.orderItems}
                    language={language}
                  />
                </article>

                <article className="summary-payment">
                  <h2 className="order-flow-title">{language.priceOverview}</h2>
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
