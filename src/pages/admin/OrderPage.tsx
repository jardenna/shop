import useLanguage from '../../features/language/useLanguage';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const OrderPage = () => {
  const { language } = useLanguage();

  return (
    <AdminPageContainer heading={language.orders}>
      {language.orders}
    </AdminPageContainer>
  );
};

export default OrderPage;
