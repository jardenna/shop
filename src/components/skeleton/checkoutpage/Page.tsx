import PaymentMethods from './PaymentMethods';
import SummeryLine from './SummeryLine';

const Page = () => (
  <div className="layout">
    {/* <!-- LEFT COLUMN --> */}
    <div className="left-col">
      <div className="section">
        <div className="address-heading skeleton" />
        <div className="address-lines">
          <div className="skeleton line-name" />
          <div className="skeleton line-street" />
          <div className="skeleton line-city" />
          <div className="skeleton line-country" />
        </div>
        <div className="address-actions">
          <div className="skeleton" />
          <div className="skeleton" />
        </div>
        <div className="add-address-row">
          <div className="skeleton" />
        </div>
      </div>
      <PaymentMethods />

      <div className="section-label skeleton" />

      <span className="form-row">
        <span className="form-field">
          <span className="field-label skeleton" />
          <span className="field-input skeleton" />
        </span>
        <span className="form-field">
          <span className="field-label skeleton" />
          <span className="field-input skeleton" />
        </span>
      </span>

      <span className="form-field" style={{ marginBottom: '24px' }}>
        <span className="field-label skeleton" />
        <span className="field-input small skeleton" />
      </span>

      <span className="form-field" style={{ marginBottom: '32px' }}>
        <span className="field-label skeleton" />
        <span className="field-input skeleton" />
      </span>

      <span className="submit-btn skeleton" />
    </div>

    {/* <!-- RIGHT COLUMN --> */}
    <div className="right-col">
      <div className="summary-heading skeleton" />

      <div className="product-row">
        <div className="product-thumb skeleton" />
        <div className="product-info">
          <div className="skeleton product-title" />
          <div className="skeleton product-meta" />
        </div>
      </div>
      <SummeryLine />

      <div className="summary-total">
        <div className="skeleton label-skeleton" />
        <div className="skeleton value-skeleton" />
      </div>
    </div>
  </div>
);

export default Page;
