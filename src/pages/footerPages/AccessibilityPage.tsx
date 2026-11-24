import CustomerServiceLink from '../../components/CustomerServiceLink';
import Input from '../../components/formElements/Input';
import CategoryOptions from '../../components/selectbox/CategoryOptions';
import SelectboxNew from '../../components/selectbox/SelectboxNew';
import { useLanguage } from '../../features/language/useLanguage';
import { useFormValidation } from '../../hooks/useFormValidation';
import MainPageContainer from '../pageContainer/MainPageContainer';

export interface Category {
  label: string;
  value: string;
}

interface InitialAccessibilityValues {
  category: Category | null;
  name: string;
}

const AccessibilityPage = () => {
  const { language } = useLanguage();

  const categoryOptions: Category[] = [
    { value: 'clothing', label: 'Clothing' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'furniture', label: 'Furniture' },
  ];

  const initialState: InitialAccessibilityValues = {
    category: null,
    name: '',
  };

  const { values, onSelectChange, onChange } = useFormValidation({
    initialState,
  });

  console.log(values);

  return (
    <MainPageContainer
      heading={language.accessibilityStatement}
      className="general-page"
    >
      <div className="generel-page-container">
        <SelectboxNew
          name="category"
          labelText="Category"
          options={categoryOptions}
          value={values.category}
          onChange={onSelectChange}
          components={{ Option: CategoryOptions }}
          id="Teast"
        />
        <Input
          onChange={onChange}
          id="name"
          labelText="Name"
          name="name"
          value={values.name}
        />
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
          <ul className="secondary">
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
            Please contact our <CustomerServiceLink /> if you need assistance or
            would like to report an accessibility issue.
          </p>
        </section>
      </div>
    </MainPageContainer>
  );
};

export default AccessibilityPage;
