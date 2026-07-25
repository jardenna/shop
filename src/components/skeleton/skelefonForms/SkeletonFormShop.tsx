import SkeletonButton from '../SkeletonButton';
import SkeletonInput from '../SkeletonInput';
import './_skeleton-form.scss';

const SkeletonFormShop = () => (
  <div>
    <div className="section-label skeleton" />

    <span className="form-row">
      <span className="form-field">
        <SkeletonInput />
      </span>
      <span className="form-field">
        <SkeletonInput />
      </span>
    </span>

    <span className="form-field" style={{ marginBottom: '24px' }}>
      <SkeletonInput className="small" />
    </span>

    <span className="form-field" style={{ marginBottom: '32px' }}>
      <SkeletonInput />
    </span>

    <SkeletonButton />
  </div>
);

export default SkeletonFormShop;
