import { useLanguage } from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const TermsAndConditionsPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer
      heading={language.termsAndConditions}
      className="general-page"
    >
      <div className="generel-page-container">
        <section>
          <h2>General information</h2>
          <p>
            Welcome to Fashion Fusion. These Terms & Conditions apply to the
            Fashion Fusion website located at www.fashion-fusion and all other
            sites, mobile sites, services, applications, platforms and tools
            where these Terms & Conditions appear or are linked (collectively,
            the "Site").
          </p>
          <p>
            As used in these Terms & Conditions, "Fashion Fusion", "us" or "we"
            refers to Fashion Fusion Corporation and its subsidiaries and
            affiliates.
          </p>
          <p>
            These terms and conditions apply to all purchases made through our
            online store. By placing an order, you agree to these terms and
            conditions.
          </p>
        </section>

        <section>
          <h2>Orders</h2>
          <p>
            When you place an order, you will receive an order confirmation by
            email. An order is considered accepted once we have confirmed that
            the products are available and ready for delivery.
          </p>
          <p>
            We reserve the right to cancel an order in the event of pricing
            errors, stock discrepancies or other circumstances that prevent us
            from fulfilling the order.
          </p>
        </section>

        <section>
          <h2>Prices and payment</h2>
          <p>
            All prices displayed on the website are shown in the applicable
            currency and include applicable taxes unless otherwise stated.
            Payment is processed securely at the time of purchase.
          </p>
        </section>

        <section>
          <h2>Delivery</h2>
          <p>
            We aim to process and dispatch orders as quickly as possible.
            Delivery times may vary depending on the destination and selected
            shipping method.
          </p>
          <p>
            You will receive tracking information when your order has been
            dispatched, where tracking is available.
          </p>
        </section>

        <section>
          <h2>Returns and refunds</h2>
          <p>
            You may return eligible items within the applicable return period.
            Items must be returned in their original condition and with any
            original packaging or labels where applicable.
          </p>
          <p>
            Once your return has been received and approved, we will process
            your refund using the original payment method.
          </p>
        </section>

        <section>
          <h2>Defective products</h2>
          <p>
            If you receive a defective or incorrect product, please contact our
            customer service as soon as possible. We will help you find an
            appropriate solution.
          </p>
        </section>

        <section>
          <h2>Changes to these terms</h2>
          <p>
            We may update these terms and conditions from time to time. The
            terms that apply to your purchase are the terms available on the
            website at the time you place your order.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            If you have any questions about these terms and conditions, please
            contact our customer service.
          </p>
        </section>
      </div>
    </MainPageContainer>
  );
};

export default TermsAndConditionsPage;
