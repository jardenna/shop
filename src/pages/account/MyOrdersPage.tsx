import { useLanguage } from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const MyOrdersPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer variant="medium" heading={language.myOrders}>
      <p>{language.viewAndTrackOrders}</p>
      <p>{language.whenOrderViewAndTrack}</p>
    </MainPageContainer>
  );
};

export default MyOrdersPage;
