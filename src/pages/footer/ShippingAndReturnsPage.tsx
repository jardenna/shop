import { useLanguage } from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const ShippingAndReturnsPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.shippingAndReturns}>
      <section>ShippingAndReturns</section>
    </MainPageContainer>
  );
};

export default ShippingAndReturnsPage;
