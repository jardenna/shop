import DateDisplay from '../../components/datePicker/DateDisplay';
import Icon from '../../components/icons/Icon';
import { useLanguage } from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import './_invoice-page.scss';
import orders from './data.json';

const InvoicePage = () => {
  const { language } = useLanguage();

  return (
    <article className="page">
      <section className="top">
        <Icon iconName={IconName.Logo} />
        <div>
          <span className="info-uppercase">{language.orderNo}:</span>{' '}
          <span className="info-bold">{orders.id}</span>
        </div>
      </section>
      <section className="header">
        <section className="user-info">
          <h2 className="info-uppercase">Invoice to:</h2>
          <div className="title">{orders.user.username}</div>
          <div className="text">{orders.billingAddress.street}</div>
          <div className="text">
            {orders.billingAddress.zipCode} {orders.billingAddress.city}{' '}
            {orders.billingAddress.country}
          </div>

          <div className="text margin-top">
            {language.email}: {orders.user.email}
          </div>
          <div className="text">
            {language.phone}:{' '}
            {orders.user.phoneNo === '' ? ' not oplyst' : orders.user.phoneNo}
          </div>
        </section>
        <section className="order-info">
          <div>
            <div className="info-uppercase">{language.orderDate}:</div>
            <div className="info-bold">
              <DateDisplay date={orders.createdAt} />
            </div>
          </div>
          <div>
            <div className="info-uppercase">{language.paid}:</div>
            <div className="info-bold">
              <DateDisplay date={orders.payment.paidAt} />
            </div>
          </div>
        </section>
      </section>
    </article>
  );
};

export default InvoicePage;
