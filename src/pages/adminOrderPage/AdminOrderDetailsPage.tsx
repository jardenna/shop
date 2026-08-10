import { useParams } from 'react-router';
import StatusTracker from '../../components/statusTracker/StatusTracker';
import SummaryList from '../../features/cart/components/SummaryList';
import { useLanguage } from '../../features/language/useLanguage';
import OrderAddressList from '../../features/orders/components/OrderAddressList';
import OrderList from '../../features/orders/components/orders/OrderList';
import { useGetAdminOrderByIdQuery } from '../../features/orders/orderApiSlice';
import { createOrderAddressList } from '../../features/orders/utils/createOrderAddressList';
import { orderTrackingList } from '../../features/orders/utils/createTrackingList';
import { AdminPath } from '../../layout/nav/enums';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

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
          <OrderList orders={order.orderItems} language={language} />
          <SummaryList
            language={language}
            summary={order.summary}
            promoDiscount={order.discount}
          />

          <OrderAddressList addresses={addressList} refetch={refetch} />
        </article>
      )}
    </AdminPageContainer>
  );
};

export default AdminOrderDetailsPage;
