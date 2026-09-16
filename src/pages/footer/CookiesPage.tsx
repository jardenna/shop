import { useLanguage } from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const CookiesPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer heading={language.cookies} className="general-page">
      <div className="generel-page-container">
        <section>
          <h2>What are cookies</h2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They allow the website to recognise your browser and
            remember information about your visit, such as your preferences and
            settings.
          </p>
          <p>
            When you return to a website, cookies can help it remember you and
            provide a more personalised experience. They can also help websites
            understand how visitors use their pages, such as which features are
            used most often, so the website can be improved over time.
          </p>
        </section>

        <section className="important-info">
          We respect your privacy and never sell your personal information or
          cookie data to third parties. Any information collected through
          cookies is used only to provide essential functionality, remember your
          preferences, and improve your experience.
        </section>

        <section>
          <h2>Types of cookies</h2>
          <div className="section-item-container">
            <div>
              <h3>Necessary cookies</h3>
              <p>
                These cookies are required for essential features of the
                website, such as navigation, shopping cart functionality and
                secure areas. They cannot be disabled through our cookie
                settings.
              </p>
            </div>
            <div>
              <h3>Preference cookies</h3>
              <p>
                These cookies remember choices you make, such as language or
                other preferences, to provide a more personalised experience.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>How we use cookies</h2>
          <p>We use cookies to:</p>
          <ul>
            <li>Keep the website functioning correctly.</li>
            <li>Remember your preferences and settings.</li>
            <li>Improve the performance and user experience of our website.</li>
          </ul>
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
            We may update this Cookie Policy from time to time to reflect
            changes to our website or the way we use cookies. Any updates will
            be published on this page.
          </p>
        </section>
      </div>
    </MainPageContainer>
  );
};

export default CookiesPage;
