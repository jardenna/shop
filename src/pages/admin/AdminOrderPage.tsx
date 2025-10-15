import useLanguage from '../../features/language/useLanguage';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const AdminOrderPage = () => {
  const { language } = useLanguage();

  return (
    <AdminPageContainer heading={language.orders} ariaLabelledby="orders">
      {language.orders}
    </AdminPageContainer>
  );
};

export default AdminOrderPage;
