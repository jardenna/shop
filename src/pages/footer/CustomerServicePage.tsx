import Button from '../../components/Button';
import { useToast } from '../../components/toast/hooks/useToast';
import { useLanguage } from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const CustomerServicePage = () => {
  const { language } = useLanguage();
  const { onAddToast } = useToast({
    message: 'Error',
    type: 'error',
  });

  return (
    <MainPageContainer
      heading={language.contactCustomerService}
      className="general-page"
    >
      <Button onClick={onAddToast}>Add toast</Button>

      {/* <div className="generel-page-container">
        <section>
          <h2>We're here to help</h2>
          <p>
            Have a question about your order, delivery, returns or our products
            Our customer service team is happy to help.
          </p>
        </section>
        <section>
          <h2>Contact us</h2>
          <p>
            Email us at{' '}
            <a href="mailto:support@example.com">support@example.com</a>.
          </p>
          <p>We aim to respond to all enquiries within 1–2 business days.</p>
        </section>
        <section>
          <h2>Before you contact us</h2>
          <p>
            If your question is about an existing order, please include your
            order number so we can help you as quickly as possible.
          </p>
        </section>
        <section>
          <h2>Customer service hours</h2>
          <p>Monday–Friday: 9:00–17:00</p>
          <p>We are closed on weekends and public holidays.</p>
        </section>
      </div> */}
    </MainPageContainer>
  );
};

export default CustomerServicePage;
