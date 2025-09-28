import useLanguage from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const ShoppingChartPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.shopCart}>
      <section>Kurv</section>
    </MainPageContainer>
  );
};

export default ShoppingChartPage;
