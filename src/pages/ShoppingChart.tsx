import useLanguage from '../features/language/useLanguage';
import MainPageContainer from './pageContainer/MainPageContainer';

const ShoppingChart = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.shopCart}>Kurv</MainPageContainer>
  );
};

export default ShoppingChart;
