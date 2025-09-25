import useLanguage from '../../features/language/useLanguage';

const Orders = () => {
  const { language } = useLanguage();

  return <div>{language.orders}</div>;
};

export default Orders;
