import useLanguage from '../../features/language/useLanguage';
import PageContainer from '../pageContainer/AdminPageContainer';

const OrderPage = () => {
  const { language } = useLanguage();

  return (
    <article className="admin-page">
      <PageContainer heading={language.orders}>{language.orders}</PageContainer>
    </article>
  );
};

export default OrderPage;
