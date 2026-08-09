import { useParams } from 'react-router';
import { useLanguage } from '../../features/language/useLanguage';
import MyOrderList from '../../features/orders/components/orders/OrderList';
import { useGetOrderByIdQuery } from '../../features/orders/orderApiSlice';
import { AdminPath } from '../../layout/nav/enums';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const AdminOrderDetailsPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const { data: order } = useGetOrderByIdQuery(id ?? '');
  console.log(order);

  return (
    <AdminPageContainer
      heading={language.category}
      linkText={language.createNewCategory}
      linkTo={AdminPath.AdminSubCategoryCreate}
    >
      {order && <MyOrderList orders={order.orderItems} language={language} />}
    </AdminPageContainer>
  );
};

export default AdminOrderDetailsPage;
