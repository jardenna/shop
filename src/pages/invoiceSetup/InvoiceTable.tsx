import { useLanguage } from '../../features/language/useLanguage';
import orders from './data.json';

const InvoiceTable = () => {
  console.log(orders);
  const { language } = useLanguage();
  return (
    <section>
      {language.noData}{' '}
      {orders.orderItems.map((orderitem) => (
        <div key={orderitem.id}>{orderitem.productName}</div>
      ))}
    </section>
  );
};

export default InvoiceTable;
