import { useLanguage } from '../../features/language/useLanguage';
import MainPageContainer from '../pageContainer/MainPageContainer';

const AccessibilityPage = () => {
  const { language } = useLanguage();

  return (
    <MainPageContainer
      heading={language.accessibilityStatement}
      className="general-page"
    >
      <div className="generel-page-container">
        <section>
          <h2>Our commitment to accessibility</h2>
          <p>
            We are committed to making our website accessible and usable for as
            many people as possible. We aim to provide an inclusive shopping
            experience regardless of ability, device or technology.
          </p>
        </section>

        <section>
          <h2>Accessibility standards</h2>
          <p>
            We work towards meeting the Web Content Accessibility Guidelines
            (WCAG) 2.2 at Level AA. We continuously improve the accessibility,
            usability and overall experience of our website.
          </p>
        </section>

        <section>
          <h2>What we do</h2>
          <ul>
            <li>Content has a clear and logical structure.</li>
            <li>Interactive elements can be used with a keyboard.</li>
            <li>Images have appropriate alternative text where needed.</li>
            <li>Text has sufficient colour contrast.</li>
            <li>Forms and controls have accessible labels.</li>
            <li>The website works with assistive technologies.</li>
            <li>
              Content can be accessed across different screen sizes and devices.
            </li>
          </ul>
        </section>

        <section>
          <h2>Known limitations</h2>
          <p>
            While we aim to make every part of our website accessible, some
            content or functionality may not yet fully meet our accessibility
            goals. We are continuously working to identify and address
            accessibility issues.
          </p>
        </section>

        <section>
          <h2>Feedback</h2>
          <p>
            If you experience an accessibility barrier or have difficulty using
            any part of our website, we welcome your feedback. Your feedback
            helps us improve the shopping experience for everyone.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Please contact our customer service if you need assistance or would
            like to report an accessibility issue.
          </p>
        </section>
      </div>
    </MainPageContainer>
  );
};

export default AccessibilityPage;
