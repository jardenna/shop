import useLanguage from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const Orders = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.orders}>Ordrer</MainPageContainer>
  );
};

export default Orders;
