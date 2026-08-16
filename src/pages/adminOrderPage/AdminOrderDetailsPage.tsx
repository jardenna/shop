import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import Button from '../../components/Button';
import Cart from '../../components/carts/Cart';
import DateDisplay from '../../components/datePicker/DateDisplay';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import { useMessagePopup } from '../../components/messagePopup/useMessagePopup';
import NotFoundError from '../../components/NotFoundError';
import ProgressTracker from '../../components/progressTracker/ProgressTracker';
import SimpleTable from '../../components/simpleTable/SimpleTable';
import SummaryList from '../../features/cart/components/SummaryList';
import { useLanguage } from '../../features/language/useLanguage';
import {
  useGetAdminOrderByIdQuery,
  useShipOrderMutation,
  useUpdateOrderMutation,
} from '../../features/orders/adminOrderApiSlice';
import ConfirmationDetails from '../../features/orders/components/confirmation/ConfirmationDetails';
import OrderAddressList from '../../features/orders/components/OrderAddressList';
import OrderHeading from '../../features/orders/components/orderHeading/OrderHeading';
import OrderList from '../../features/orders/components/orders/OrderList';
import { createOrderAddressList } from '../../features/orders/utils/createOrderAddressList';
import { orderTrackingList } from '../../features/orders/utils/createTrackingList';
import { AdminPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';
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
  } = useGetAdminOrderByIdQuery(id ?? '');

  const [updateOrder] = useUpdateOrderMutation();
  const [shipOrder] = useShipOrderMutation();

  const handleUpdateOrder = async () => {
    try {
      const result = await updateOrder({
        orderId: id ?? '',
        status: 'processing',
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

  const status = {
    status: order?.delivery.status ?? 'created',
  };

  const tableHeaderList = [
    { label: 'status' },
    { label: 'dateAndTime' },
    { label: 'performedBy' },
  ];

  return (
    <AdminPageContainer
      heading={id ?? ''}
      linkText={language.createNewCategory}
      linkTo={AdminPath.AdminSubCategoryCreate}
    >
      <div className="confirmation-content">
        <Cart>
          <ProgressTracker steps={orderTrackingList} status={status} />
          <div>
            <Button onClick={handleUpdateOrder}>{language.reopenOrder}</Button>
            <Button onClick={handleShipOrder}>{language.sendOrder}</Button>
          </div>
        </Cart>

        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={refetch}
        >
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

              <div>
                <Button variant={BtnVariant.Secondary}>
                  {language.printOrder}
                </Button>
                <Button variant={BtnVariant.Danger}>
                  {language.cancelOrder}
                </Button>
              </div>
            </div>
          )}
        </ErrorBoundary>
      </div>
    </AdminPageContainer>
  );
};

export default AdminOrderDetailsPage;
