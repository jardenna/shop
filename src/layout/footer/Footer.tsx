import { PaymentMethods } from '../../app/api/apiTypes/paymentApiTypes';
import PaymentMethodsList from '../../features/cart/components/PaymentMethodsList';
import LayoutElement from '../LayoutElement';
import {
  footerAccountNav,
  footerCompanyNav,
  footerServiceNav,
  footerShopNav,
} from '../nav/navLists';
import './_footer.scss';
import FooterNav from './FooterNav';

const Footer = () => {
  // Make endpoint
  const paymentMethods: PaymentMethods[] = [
    'visa',
    'mastercard',
    'paypal',
    'mobilepay',
  ];

  return (
    <LayoutElement ariaLabel="main" as="footer" className="main-footer">
      <section className="container">
        <article className="footer-shop-info">
          <div className="footer-payment-methods">
            Betalings metoder
            <PaymentMethodsList paymentMethods={paymentMethods} />
          </div>
          forsendelses info
        </article>
        <article className="footer-container">
          <FooterNav navList={footerShopNav} title="Shop" />
          <FooterNav navList={footerServiceNav} title="Kundeservice" />
          <FooterNav navList={footerCompanyNav} title="Virksomhed" />
          <FooterNav navList={footerAccountNav} title="Account" />
        </article>
        {/* <article>
          <IconContent iconName={IconName.Facebook} ariaLabel="Facbook" />
          <IconContent iconName={IconName.Instagram} ariaLabel="Instagram" />
          <IconContent iconName={IconName.Tiktok} ariaLabel="Tiktok" />
        </article> */}
      </section>
    </LayoutElement>
  );
};
export default Footer;
