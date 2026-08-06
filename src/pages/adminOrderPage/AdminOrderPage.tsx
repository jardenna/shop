import { useLanguage } from '../../features/language/useLanguage';
import { useGetAllOrdersQuery } from '../../features/orders/orderApiSlice';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const AdminOrderPage = () => {
  const { language } = useLanguage();

  const { data: orders } = useGetAllOrdersQuery();
  console.log(orders);

  return (
    <AdminPageContainer heading={language.orders} ariaLabelledby="orders">
      {language.orders}
    </AdminPageContainer>
  );
};

export default AdminOrderPage;
