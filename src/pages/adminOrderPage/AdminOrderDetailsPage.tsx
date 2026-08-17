import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import { DeliveryStatus } from '../../app/api/apiTypes/orderApiTypes';
import DateDisplay from '../../components/datePicker/DateDisplay';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import { useMessagePopup } from '../../components/messagePopup/useMessagePopup';
import NotFoundError from '../../components/NotFoundError';
import SimpleTable from '../../components/simpleTable/SimpleTable';
import SkeletonOrderConfirmationPage from '../../components/skeleton/skeletonOrderConfirmationPage/SkeletonOrderConfirmationPage';
import SummaryList from '../../features/cart/components/SummaryList';
import { useLanguage } from '../../features/language/useLanguage';
import {
  useGetAdminOrderByIdQuery,
  useShipOrderMutation,
  useUpdateOrderMutation,
} from '../../features/orders/adminOrderApiSlice';
import AdminOrderFooter from '../../features/orders/components/AdminOrderFooter';
import OrderAddressList from '../../features/orders/components/OrderAddressList';
import OrderHeading from '../../features/orders/components/orderHeading/OrderHeading';
import OrderList from '../../features/orders/components/orders/OrderList';
import OrderStatusActions from '../../features/orders/components/orderStatusActions/OrderStatusActions';
import { createOrderAddressList } from '../../features/orders/utils/createOrderAddressList';
import { AdminPath } from '../../layout/nav/enums';
import { handleApiError } from '../../utils/handleApiError';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const AdminOrderDetailsPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const {
    data: order,
    refetch,
    error,
    isError,
    isLoading,
  } = useGetAdminOrderByIdQuery(id ?? '');

  const [updateOrder] = useUpdateOrderMutation();
  const [shipOrder] = useShipOrderMutation();

  const handleUpdateOrder = async (status: DeliveryStatus) => {
    try {
      const result = await updateOrder({
        orderId: id ?? '',
        status,
      }).unwrap();

      if (result.success) {
        onAddMessagePopup({
          message: result.message,
        });
      }
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  };

  const handleShipOrder = async () => {
    try {
      const result = await shipOrder(id ?? '').unwrap();

      if (result.success) {
        onAddMessagePopup({
          message: result.message,
        });
      }
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
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
        btnLabel="orders"
        path={AdminPath.AdminOrders}
      />
    );
  }

  const orderStatus = {
    status: order?.delivery.status ?? 'created',
  };

  const tableHeaderList = [
    { label: 'status' },
    { label: 'dateAndTime' },
    { label: 'performedBy' },
  ];

  return (
    <AdminPageContainer
      heading={id ? `# ${id}` : ''}
      linkText={language.createNewCategory}
      linkTo={AdminPath.AdminSubCategoryCreate}
    >
      {isLoading && <SkeletonOrderConfirmationPage />}
      <div className="confirmation-content">
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={refetch}
        >
          <OrderStatusActions
            onUpdateOrder={handleUpdateOrder}
            onShipOrder={handleShipOrder}
            orderStatus={orderStatus}
          />

          {order && (
            <div className="confirmation-content">
              <section>
                <article className="confirmation-info">
                  <OrderHeading heading={language.orderHistory} />
                  <SimpleTable
                    tableCaption={language.orderSummaryList}
                    tableHeaderList={tableHeaderList}
                    tableDataList={order.delivery.statusHistory}
                    getRowKey={({ status, changedAt }) =>
                      `${status}-${changedAt}`
                    }
                    renderCells={({
                      status,
                      changedAt,
                      changedBy,
                      actorType,
                    }) => (
                      <>
                        <td>{language[status]}</td>
                        <td>
                          <DateDisplay
                            date={changedAt}
                            hour="2-digit"
                            minute="2-digit"
                          />
                        </td>
                        <td>
                          {changedBy.username} ({language[actorType]})
                        </td>
                      </>
                    )}
                  />
                </article>
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

                <span>
                  {language.paymentMethod}
                  {order.payment.method}
                </span>
                <OrderAddressList addresses={addressList} refetch={refetch} />
              </section>
              <AdminOrderFooter
                language={language}
                isCanceled={order.delivery.status === 'cancelled'}
              />
            </div>
          )}
        </ErrorBoundary>
      </div>
    </AdminPageContainer>
  );
};

export default AdminOrderDetailsPage;
