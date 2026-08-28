import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import { paymentMethodLabels } from '../../app/api/apiConstants';
import { DeliveryStatus } from '../../app/api/apiTypes/orderApiTypes';
import Cart from '../../components/carts/Cart';
import DateDisplay from '../../components/datePicker/DateDisplay';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import { useMessagePopup } from '../../components/messagePopup/useMessagePopup';
import NotFoundError from '../../components/NotFoundError';
import SimpleTable from '../../components/simpleTable/SimpleTable';
import SkeletonOrderDetailsPage from '../../components/skeleton/skeletonOrderDetailsPage/SkeletonOrderDetailsPage';
import { useLanguage } from '../../features/language/useLanguage';
import {
  useCancelOrderMutation,
  useGetAdminOrderByIdQuery,
  useShipOrderMutation,
  useUpdateOrderMutation,
} from '../../features/orders/adminOrderApiSlice';
import AdminOrderFooter from '../../features/orders/components/AdminOrderFooter';
import OrderAddressList from '../../features/orders/components/orderAddressList/OrderAddressList';
import OrderHeading from '../../features/orders/components/orderHeading/OrderHeading';
import OrderPaymentInfo from '../../features/orders/components/orderPaymentInfo/OrderPaymentInfo';
import OrderStatusActions from '../../features/orders/components/orderStatusActions/OrderStatusActions';
import OrderSummary from '../../features/orders/components/OrderSummary';
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
  const [cancelOrder] = useCancelOrderMutation();

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

  const handleCancelOrder = async () => {
    try {
      const result = await cancelOrder(id ?? '').unwrap();

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
      heading={language.orderDetails}
      variant="medium"
      hideBreadCrumbs
      linkText={language.backToOrderList}
      linkTo={AdminPath.AdminOrders}
    >
      {isLoading && <SkeletonOrderDetailsPage />}

      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={refetch}
      >
        <h2>
          {language.orderNo}: # {id}
        </h2>
        <OrderStatusActions
          onUpdateOrder={handleUpdateOrder}
          onShipOrder={handleShipOrder}
          orderStatus={orderStatus}
        />

        {order && (
          <div className="order-details-content">
            <Cart>
              <OrderHeading heading={language.orderHistory} />
              <SimpleTable
                tableCaption={language.orderSummaryList}
                tableHeaderList={tableHeaderList}
                tableDataList={order.delivery.statusHistory}
                getRowKey={({ status, changedAt }) => `${status}-${changedAt}`}
                renderCells={({ status, changedAt, changedBy, actorType }) => (
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
                      {actorType === 'system'
                        ? language.system
                        : `${changedBy.username} (${language[actorType]})`}
                    </td>
                  </>
                )}
              />
            </Cart>

            <Cart>
              <OrderSummary language={language} order={order} />
            </Cart>
            <Cart>
              <OrderHeading heading={language.customerInformation} />
              <article className="order-details-info-container">
                <OrderPaymentInfo
                  paymentMethod={paymentMethodLabels[order.payment.method]}
                  label={language.paymentMethod}
                />

                <OrderAddressList addresses={addressList} refetch={refetch} />
              </article>
            </Cart>
            <AdminOrderFooter
              language={language}
              onCancelOrder={handleCancelOrder}
              id={order.id}
              triggerModalDisabled={
                orderStatus.status !== 'created' &&
                orderStatus.status !== 'processing'
              }
            />
          </div>
        )}
      </ErrorBoundary>
    </AdminPageContainer>
  );
};

export default AdminOrderDetailsPage;
