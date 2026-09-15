import { useLanguage } from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const CookiesPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.cookies}>
      <section>
        <h2>What are cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a
          website. They help websites remember your preferences and understand
          how the site is being used.
        </p>
      </section>

      <section>
        <h2>How we use cookies</h2>
        <p>We use cookies to:</p>
        <ul>
          <li>Keep the website functioning correctly.</li>
          <li>Remember your preferences and settings.</li>
          <li>Understand how visitors use our website.</li>
          <li>Improve the performance and user experience of our website.</li>
        </ul>
      </section>

      <section>
        <h2>Types of cookies</h2>

        <h3>Necessary cookies</h3>
        <p>
          These cookies are required for essential features of the website, such
          as navigation, shopping cart functionality and secure areas. They
          cannot be disabled through our cookie settings.
        </p>

        <h3>Analytics cookies</h3>
        <p>
          These cookies help us understand how visitors interact with our
          website so we can improve its functionality and performance.
        </p>

        <h3>Preference cookies</h3>
        <p>
          These cookies remember choices you make, such as language or other
          preferences, to provide a more personalised experience.
        </p>
      </section>

      <section>
        <h2>Managing cookies</h2>
        <p>
          You can manage or delete cookies through your browser settings.
          Disabling certain cookies may affect how some parts of the website
          function.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes
          to our website or the way we use cookies. Any updates will be
          published on this page.
        </p>
      </section>
    </MainPageContainer>
  );
};

export default CookiesPage;
