import { PaymentMethods } from '../../app/api/apiTypes/paymentApiTypes';
import IconContent from '../../components/IconContent';
import PaymentMethodsList from '../../features/cart/components/PaymentMethodsList';
import { IconName } from '../../types/enums';
import LayoutElement from '../LayoutElement';
import { LinkText, ShopPath } from '../nav/enums';
import { subNavList } from '../nav/navLists';
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

  const footerSubNavList = [
    {
      path: ShopPath.Root,
      linkText: LinkText.Home,
    },
    ...subNavList.map(({ path, linkText }) => ({ path, linkText })),
    {
      path: ShopPath.Sale,
      linkText: LinkText.Sale,
    },
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
          <FooterNav navList={footerSubNavList} title="Shop" />

          <div>
            <nav aria-label="Kundeservice">
              <h2>Kundeservice</h2>
              <ul>
                <li>
                  <a href="/contact">Kontakt os</a>
                </li>
                <li>
                  <a href="/faq">FAQ</a>
                </li>
                <li>
                  <a href="/shipping">Levering</a>
                </li>
                <li>
                  <a href="/returns">Returnering</a>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <div>
              <nav aria-label="Virksomhed">
                <h2>Virksomhed</h2>
                <ul>
                  <li>
                    <a href="/contact">Om os</a>
                  </li>
                  <li>
                    <a href="/faq">handelsbetingelser</a>
                  </li>
                  <li>
                    <a href="/shipping">privatliv</a>
                  </li>
                  <li>
                    <a href="/returns">Cookies</a>
                  </li>
                  <li>
                    <a href="/returns">Accessibility statement</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div>
            <nav aria-label="Account">
              <h2>Account</h2>
              <ul>
                <li>
                  <a href="/faq">Mine ordrer </a>
                </li>
                <li>
                  <a href="/shipping">login</a>
                </li>
              </ul>
            </nav>
          </div>
        </article>
        <article>
          <IconContent iconName={IconName.Facebook} ariaLabel="Facbook" />
          <IconContent iconName={IconName.Instagram} ariaLabel="Instagram" />
          <IconContent iconName={IconName.Tiktok} ariaLabel="Tiktok" />
        </article>
      </section>
    </LayoutElement>
  );
};
export default Footer;
