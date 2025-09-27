import useLanguage from '../../features/language/useLanguage';

const Orders = () => {
  const { language } = useLanguage();

  return (
    <div>
      <p>{language.viewAndTrackOrders}</p>
      <p>{language.whenOrderViewAndTrack}</p>
    </div>
  );
};

export default Orders;
