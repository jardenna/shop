import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import NotFoundError from '../../components/NotFoundError';
import ProgressTracker from '../../components/progressTracker/ProgressTracker';
import SummaryList from '../../features/cart/components/SummaryList';
import { useLanguage } from '../../features/language/useLanguage';
import { useGetAdminOrderByIdQuery } from '../../features/orders/adminOrderApiSlice';
import ConfirmationDetails from '../../features/orders/components/confirmation/ConfirmationDetails';
import OrderAddressList from '../../features/orders/components/OrderAddressList';
import OrderList from '../../features/orders/components/orders/OrderList';
import { createOrderAddressList } from '../../features/orders/utils/createOrderAddressList';
import { orderTrackingList } from '../../features/orders/utils/createTrackingList';
import { AdminPath } from '../../layout/nav/enums';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const AdminOrderDetailsPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const {
    data: order,
    refetch,
    error,
    isError,
  } = useGetAdminOrderByIdQuery(id ?? '');

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
        btnLabel="orders"
        path={AdminPath.AdminOrders}
      />
    );
  }

  const status = {
    status: order?.delivery.status ?? 'created',
  };

  return (
    <AdminPageContainer
      heading={id ?? ''}
      linkText={language.createNewCategory}
      linkTo={AdminPath.AdminSubCategoryCreate}
    >
      <div className="confirmation-content">
        <div className="form-cart">
          <ProgressTracker steps={orderTrackingList} status={status} />
        </div>

        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={refetch}
        >
          {order && (
            <div className="confirmation-content">
              <section className="confirmation-summary">
                <article className="summary-items">
                  <h2 className="order-flow-title">{language.orderedItems}</h2>

                  <OrderList orders={order.orderItems} language={language} />
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
            </div>
          )}
        </ErrorBoundary>
      </div>
    </AdminPageContainer>
  );
};

export default AdminOrderDetailsPage;
