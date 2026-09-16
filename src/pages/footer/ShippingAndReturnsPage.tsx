import CustomerServiceLink from '../../components/CustomerServiceLink';
import { useLanguage } from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const ShippingAndReturnsPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer
      heading={language.shippingAndReturns}
      className="general-page"
    >
      <div className="generel-page-container">
        <section>
          <h2>Delivery</h2>
          <p>
            We aim to process and dispatch orders as quickly as possible.
            Delivery times depend on your location and the shipping method
            selected at checkout.
          </p>
          <p>
            Once your order has been dispatched, you will receive a confirmation
            email with tracking information where available.
          </p>
        </section>
        <section>
          <h2>Shipping options</h2>
          <p>
            Available shipping methods and delivery costs are shown at checkout
            before you complete your purchase. Delivery options may vary
            depending on your location.
          </p>
        </section>
        <section>
          <h2>Returns</h2>
          <p>
            We want you to be happy with your purchase. Eligible items can be
            returned within the applicable return period.
          </p>
          <p>
            Items must be returned in their original condition, unworn and with
            any original labels and packaging where applicable.
          </p>
        </section>
        <section>
          <h2>How to return an item</h2>
          <ol>
            <li>
              Contact our customer service or follow the return instructions
              provided with your order.
            </li>
            <li>
              Pack the item securely and include the required return
              information.
            </li>
            <li>Send the package using the return method provided.</li>
          </ol>
        </section>
        <section>
          <h2>Refunds</h2>
          <p>
            Once we receive and approve your return, we will process your refund
            using the original payment method.
          </p>
          <p>
            Please allow some time for the refund to appear in your account
            after it has been processed.
          </p>
        </section>
        <section>
          <h2>Damaged or incorrect items</h2>
          <p>
            If your order arrives damaged or you receive an incorrect item,
            please contact our <CustomerServiceLink /> as soon as possible. We
            will help you resolve the issue.
          </p>
        </section>
        <section>
          <h2>Need help</h2>
          <p>
            If you have any questions about delivery or returns, please contact
            our <CustomerServiceLink />.
          </p>
        </section>
      </div>
    </MainPageContainer>
  );
};

export default ShippingAndReturnsPage;
