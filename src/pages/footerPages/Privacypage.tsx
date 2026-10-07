import CustomerServiceLink from '../../components/CustomerServiceLink';
import { useLanguage } from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const PrivacyPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.privacy} className="general-page">
      <div className="generel-page-container">
        <section>
          <h2>Your privacy</h2>
          <section className="important-info">
            We may share relevant personal information with trusted service
            providers who help us operate our website, process payments, deliver
            orders, and provide customer support. These providers only receive
            the information necessary to perform their services and are required
            to handle your information securely.
          </section>
        </section>

        <section>
          <h2>Sharing your information</h2>
          <p>
            Personal information with the following categories of service
            providers:
          </p>
          <table>
            <thead>
              <tr>
                <th>Providers</th>
                <th>Which information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Payment providers</td>
                <td>Payment and order information</td>
              </tr>
              <tr>
                <td>Shipping providers</td>
                <td>Name, address, and contact information</td>
              </tr>
              <tr>
                <td>Email service providers</td>
                <td>
                  Email address and, where applicable, order confirmations
                </td>
              </tr>
              <tr>
                <td>Website hosting providers</td>
                <td>IP address and technical data</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <h2>Information we collect</h2>
          <p>
            We collect information you provide when you place an order, create
            an account, contact customer service or interact with our website.
            This may include your name, email address, shipping address, billing
            information and order details.
          </p>
        </section>
        <section>
          <h2>How we use your information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Process and deliver your orders.</li>
            <li>Manage your account and preferences.</li>
            <li>Provide customer service and support.</li>
            <li>Communicate with you about your orders.</li>
            <li>Improve our website, products and services.</li>
            <li>Protect our website and prevent fraudulent activity.</li>
          </ul>
        </section>

        <section>
          <h2>Payment information</h2>
          <p>
            Payment information is processed securely by our payment providers.
            We do not store complete payment card details on our own systems.
          </p>
        </section>
        <section>
          <h2>Data retention</h2>
          <p>
            We retain personal information only for as long as necessary to
            provide our services, fulfil our legal obligations and resolve
            disputes.
          </p>
        </section>
        <section>
          <h2>Your rights</h2>
          <p>
            Depending on applicable data protection laws, you may have the right
            to access, correct or delete your personal information. You may also
            have rights to object to or restrict certain processing of your
            information.
          </p>
        </section>
        <section>
          <h2>Data security</h2>
          <p>
            We take reasonable technical and organisational measures to protect
            your personal information against unauthorised access, loss or
            misuse.
          </p>
        </section>
        <section>
          <h2>Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be published on this page.
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>
            If you have questions about how we handle your personal information,
            please contact our <CustomerServiceLink />.
          </p>
        </section>
      </div>
    </MainPageContainer>
  );
};

export default PrivacyPage;
