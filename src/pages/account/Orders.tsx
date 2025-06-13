import useLanguage from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const Orders = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.collection}>Contact</MainPageContainer>
  );
};

export default Orders;
