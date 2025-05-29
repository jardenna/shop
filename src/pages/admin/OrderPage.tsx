import useLanguage from '../../features/language/useLanguage';
import PageContainer from '../pageContainer/PageContainer';

const OrderPage = () => {
  const { language } = useLanguage();

  return (
    <article className="page">
      <PageContainer heading={language.orders}>{language.orders}</PageContainer>
    </article>
  );
};

export default OrderPage;
