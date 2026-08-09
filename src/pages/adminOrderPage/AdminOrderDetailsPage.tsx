import { useParams } from 'react-router';
import { useLanguage } from '../../features/language/useLanguage';
import OrderList from '../../features/orders/components/orders/OrderList';
import { useGetAdminOrderByIdQuery } from '../../features/orders/orderApiSlice';
import { AdminPath } from '../../layout/nav/enums';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const AdminOrderDetailsPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { data: order } = useGetAdminOrderByIdQuery(id ?? '');

  return (
    <AdminPageContainer
      heading={id ?? ''}
      linkText={language.createNewCategory}
      linkTo={AdminPath.AdminSubCategoryCreate}
    >
      {order && (
        <article className="order-cart">
          <OrderList orders={order.orderItems} language={language} />
        </article>
      )}
    </AdminPageContainer>
  );
};

export default AdminOrderDetailsPage;
