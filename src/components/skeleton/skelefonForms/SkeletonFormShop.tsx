import SkeletonButton from '../SkeletonButton';
import SkeletonHeading from '../SkeletonHeading';
import SkeletonInput from '../SkeletonInput';
import './_skeleton-form.scss';

const SkeletonFormShop = () => (
  <div>
    <SkeletonHeading />

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
