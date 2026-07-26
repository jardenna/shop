import SkeletonButton from '../SkeletonButton';
import SkeletonHeading from '../SkeletonHeading';
import SkeletonInput from '../SkeletonInput';
import './_skeleton-form.scss';

const SkeletonFormShop = () => (
  <>
    <SkeletonHeading />
    <div className="skeleton-form-shop">
      <span className="flex">
        <SkeletonInput />
        <SkeletonInput />
      </span>

      <SkeletonInput className="small" />
      <SkeletonInput />
      <SkeletonButton />
    </div>
  </>
);

export default SkeletonFormShop;
