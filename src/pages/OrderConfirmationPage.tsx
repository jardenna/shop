import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import SkeletonOrderPage from '../components/skeleton/skeletonOrderPage/SkeletonOrderPage';
import StatusTracker from '../components/statusTracker/StatusTracker';
import OrderItemList from '../features/cart/components/orderItemCard/OrderItemList';
import SummaryList from '../features/cart/components/SummaryList';
import { useLanguage } from '../features/language/useLanguage';
import ConfirmationDetails from '../features/orders/components/ConfirmationDetails';
import ConfirmationSubHeader from '../features/orders/components/ConfirmationSubHeader';
import OrderAddressList from '../features/orders/components/OrderAddressList';
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
    status: 'processing',
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
    return <SkeletonOrderPage />;
  }

  return (
    <MainPageContainer
      hideBreadCrumbs
      variant="large"
      heading={`${order && order.user.username}, ${language.orderConfirmationTitle}`}
    >
      <SkeletonOrderPage />
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
                  <h2 className="order-flow-title">Varer i din ordre</h2>
                  <OrderItemList
                    orders={order.orderItems}
                    language={language}
                  />
                </article>

                <article>
                  <div className="summary-payment">
                    <h2 className="order-flow-title">Prisoversigt</h2>
                    <SummaryList
                      language={language}
                      summary={order.summary}
                      promoDiscount={order.discount}
                    />
                  </div>
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
