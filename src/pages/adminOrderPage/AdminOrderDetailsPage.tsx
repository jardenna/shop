import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import Cart from '../../components/carts/Cart';
import DateDisplay from '../../components/datePicker/DateDisplay';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import NotFoundError from '../../components/NotFoundError';
import ProgressTracker from '../../components/progressTracker/ProgressTracker';
import SummaryList from '../../features/cart/components/SummaryList';
import { useLanguage } from '../../features/language/useLanguage';
import { useGetAdminOrderByIdQuery } from '../../features/orders/adminOrderApiSlice';
import ConfirmationDetails from '../../features/orders/components/confirmation/ConfirmationDetails';
import OrderAddressList from '../../features/orders/components/OrderAddressList';
import OrderHeading from '../../features/orders/components/orderHeading/OrderHeading';
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

  // const orderHistoryList=[
  //   {title: 'status', }
  // ]

  console.log(order?.delivery.statusHistory);
  return (
    <AdminPageContainer
      variant="medium"
      heading={id ?? ''}
      linkText={language.createNewCategory}
      linkTo={AdminPath.AdminSubCategoryCreate}
    >
      <div className="confirmation-content">
        <Cart>
          <ProgressTracker steps={orderTrackingList} status={status} />
        </Cart>

        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={refetch}
        >
          {order && (
            <div className="confirmation-content">
              <section>
                <article className="confirmation-info">
                  <OrderHeading
                    variant="underline"
                    heading={language.orderHistory}
                  />
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">STATUS</th>
                        <th scope="col">DATO & TID</th>
                        <th scope="col">BRUGER</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.delivery.statusHistory.map(
                        ({ status, changedAt, changedBy }) => (
                          <tr key={`${status}-${changedAt}`}>
                            <td>{language[status]}</td>
                            <td>
                              <DateDisplay date={changedAt} />
                            </td>
                            <td>
                              {changedBy.username}
                              {/* {changedBy === changedBy.username
                                ? `${language.customer} (${changedBy.username})`
                                : changedBy.username} */}
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </article>
                <ConfirmationDetails
                  createdAt={order.createdAt}
                  id={order.id}
                  method={order.payment.method}
                />
              </section>
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
                <OrderHeading heading={language.customerInformation} />
                {language.paymentMethod}
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
