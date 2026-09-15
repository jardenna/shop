import { useLanguage } from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const FaqPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.faq}>
      <section>
        <h2>Orders</h2>
        <h3>How can I place an order?</h3>
        <p>
          Add the products you want to your shopping bag and proceed to
          checkout. Follow the steps to enter your delivery and payment details,
          then confirm your order.
        </p>

        <h3>Can I change or cancel my order?</h3>
        <p>
          We process orders as quickly as possible, so changes or cancellations
          may not always be possible. Contact customer service as soon as
          possible if you need to make a change.
        </p>
      </section>
      <section>
        <h2>Payment</h2>
        <h3>Which payment methods do you accept?</h3>
        <p>
          We accept the payment methods displayed at checkout. Available options
          may vary depending on your location.
        </p>

        <h3>When will I be charged?</h3>
        <p>Your payment is processed when you complete your purchase.</p>
      </section>
      <section>
        <h2>Delivery</h2>
        <h3>How long does delivery take?</h3>
        <p>
          Delivery times depend on your location and the shipping method
          selected at checkout. You will receive tracking information when your
          order has been dispatched, where available.
        </p>

        <h3>Can I track my order?</h3>
        <p>
          Yes. When tracking is available, we will send you a tracking link once
          your order has been dispatched.
        </p>
      </section>
      <section>
        <h2>Returns</h2>
        <h3>How do I return an item?</h3>
        <p>
          Follow the return instructions provided with your order or contact our
          customer service for assistance.
        </p>

        <h3>When will I receive my refund?</h3>
        <p>
          Once we have received and approved your return, your refund will be
          processed using the original payment method.
        </p>
      </section>
      <section>
        <h2>Products</h2>
        <h3>How do I find the right size?</h3>
        <p>
          Check our size guide for measurements and size conversions before
          placing your order.
        </p>

        <h3>What should I do if an item is out of stock?</h3>
        <p>
          Availability can change over time. Check the product page again later
          for updated stock information.
        </p>
      </section>
      <section>
        <h2>Still need help?</h2>
        <p>
          If you cannot find the answer you are looking for, our customer
          service team is happy to help.
        </p>
      </section>{' '}
    </MainPageContainer>
  );
};

export default FaqPage;
