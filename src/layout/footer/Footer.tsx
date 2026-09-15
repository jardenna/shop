import { PaymentMethods } from '../../app/api/apiTypes/paymentApiTypes';
import IconContent from '../../components/IconContent';
import PaymentMethodsList from '../../features/cart/components/PaymentMethodsList';
import { IconName } from '../../types/enums';
import LayoutElement from '../LayoutElement';
import NavContainer from '../nav/NavContainer';
import { subNavList } from '../nav/navLists';
import './_footer.scss';

const Footer = () => {
  // Make endpoint
  const paymentMethods: PaymentMethods[] = [
    'visa',
    'mastercard',
    'paypal',
    'mobilepay',
  ];

  return (
    <LayoutElement ariaLabel="main" as="footer">
      <section>
        <div>
          <PaymentMethodsList paymentMethods={paymentMethods} />
        </div>
        <article>
          Vores Kollection Tilbud home
          <NavContainer navList={subNavList} />
        </article>
        <article>
          Kunde service
          <div>Kontakt os Faq Levering Returnering</div>
        </article>
        <article>
          Virksomhed
          <div>
            om os handelsbetingelsr privatliv Cookies accessibility statement
          </div>
        </article>
        <article>
          Account
          <div>Mine ordrer login</div>
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
