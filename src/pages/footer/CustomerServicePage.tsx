import { useLanguage } from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const CustomerServicePage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.contactCustomerService}>
      <section>CustomerService</section>
    </MainPageContainer>
  );
};

export default CustomerServicePage;
