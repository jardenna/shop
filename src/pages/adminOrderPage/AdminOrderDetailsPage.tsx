import { useParams } from 'react-router';
import StatusTracker from '../../components/statusTracker/StatusTracker';
import SummaryList from '../../features/cart/components/SummaryList';
import { useLanguage } from '../../features/language/useLanguage';
import ConfirmationDetails from '../../features/orders/components/confirmation/ConfirmationDetails';
import OrderAddressList from '../../features/orders/components/OrderAddressList';
import OrderList from '../../features/orders/components/orders/OrderList';
import { createOrderAddressList } from '../../features/orders/utils/createOrderAddressList';
import { orderTrackingList } from '../../features/orders/utils/createTrackingList';
import { AdminPath } from '../../layout/nav/enums';
import AdminPageContainer from '../pageContainer/AdminPageContainer';
import { useGetAdminOrderByIdQuery } from '../../features/orders/AdminOrderApiSlice';

const AdminOrderDetailsPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { data: order, refetch } = useGetAdminOrderByIdQuery(id ?? '');

  const status = {
    status: order?.delivery.status ?? 'created',
  };

  const addressList = order
    ? createOrderAddressList({
        billingAddress: order.billingAddress,
        shippingAddress: order.shippingAddress,
      })
    : [];

  return (
    <AdminPageContainer
      heading={id ?? ''}
      linkText={language.createNewCategory}
      linkTo={AdminPath.AdminSubCategoryCreate}
    >
      <StatusTracker steps={orderTrackingList} status={status} />
      {order && (
        <article className="order-cart">
          <article className="summary-items">
            <h2 className="order-flow-title">{language.orderedItems}</h2>
            <OrderList
              orders={order.orderItems}
              language={language}
              hidePrice
              variant="small"
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
          <section className="confirmation-info-container">
            <ConfirmationDetails
              createdAt={order.createdAt}
              id={order.id}
              method={order.payment.method}
            />

            <OrderAddressList addresses={addressList} refetch={refetch} />
          </section>
        </article>
      )}
    </AdminPageContainer>
  );
};

export default AdminOrderDetailsPage;
