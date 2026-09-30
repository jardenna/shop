import DateDisplay from '../../components/datePicker/DateDisplay';
import Icon from '../../components/icons/Icon';
import { IconName } from '../../types/enums';
import './_invoice-page.scss';
import orders from './data.json';

const InvoicePage = () => {
  console.log(orders);

  //    Order number
  // ├── Invoice date

  return (
    <section className="page">
      <div className="header">
        <Icon iconName={IconName.Logo} />
        <div className="heading">Invoice</div>
        <div>Ordrenummer</div>
        {orders.id}
        <div>Invoice date</div>
        <DateDisplay date={orders.createdAt} />
        <div>
          Paid <DateDisplay date={orders.payment.paidAt} />
        </div>
      </div>
    </section>
  );
};

export default InvoicePage;
