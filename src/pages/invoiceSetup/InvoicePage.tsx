import DateDisplay from '../../components/datePicker/DateDisplay';
import Icon from '../../components/icons/Icon';
import { useLanguage } from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import './_invoice-page.scss';
import orders from './data.json';

const InvoicePage = () => {
  console.log(orders);
  const { language } = useLanguage();

  //    Order number
  // ├── Invoice date

  return (
    <section className="page">
      <div className="header">
        <Icon iconName={IconName.Logo} />
        <div className="section">
          <div className="heading">{language.order}</div>
          <div>{language.orderNo}</div>
          {orders.id}
          <div>{language.orderDate}</div>
          <DateDisplay date={orders.createdAt} />
          <div>
            {language.paid} <DateDisplay date={orders.payment.paidAt} />
          </div>
        </div>
        <div className="section">
          <div className="heading">{language.order}</div>

          <div className="bold">{orders.user.username}</div>
          <div className="text">
            {language.email}: {orders.user.email}
          </div>
          <div className="text">
            {language.phone}:{' '}
            {orders.user.phoneNo === '' ? ' not oplyst' : orders.user.phoneNo}
          </div>
          <div className="text">{orders.billingAddress.street}</div>
          <div className="text">
            {orders.billingAddress.zipCode} {orders.billingAddress.city}
          </div>

          <div className="text">{orders.billingAddress.country}</div>
        </div>
      </div>
    </section>
  );
};

export default InvoicePage;
