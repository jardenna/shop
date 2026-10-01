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
    <article className="page">
      <section className="header">
        <Icon iconName={IconName.Logo} />
        <section className="user-info">
          <div className="title">{orders.user.username}</div>
          <div className="text">{orders.billingAddress.street}</div>
          <div className="text">
            {orders.billingAddress.zipCode} {orders.billingAddress.city}{' '}
            {orders.billingAddress.country}
          </div>

          <div className="text">
            {language.email}: {orders.user.email}
          </div>
          <div className="text">
            {language.phone}:{' '}
            {orders.user.phoneNo === '' ? ' not oplyst' : orders.user.phoneNo}
          </div>
        </section>
        <section className="section">
          <div className="heading">{language.order}</div>
          <div>{language.orderNo}</div>
          {orders.id}
          <div>{language.orderDate}</div>
          <div className="title">
            <DateDisplay date={orders.createdAt} />
          </div>
          <div>
            {language.paid} <DateDisplay date={orders.payment.paidAt} />
          </div>
        </section>
      </section>
    </article>
  );
};

export default InvoicePage;
