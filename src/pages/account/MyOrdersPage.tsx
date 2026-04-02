import { useLanguage } from '../../features/language/useLanguage';

const MyOrdersPage = () => {
  const { language } = useLanguage();

  return (
    <div>
      <p>{language.viewAndTrackOrders}</p>
      <p>{language.whenOrderViewAndTrack}</p>
    </div>
  );
};

export default MyOrdersPage;
