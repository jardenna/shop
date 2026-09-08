import Skeleton, { SkeletonProps } from '../Skeleton';
import SkeletonButton from '../SkeletonButton';
import SkeletonControlList from '../SkeletonControlList';
import SkeletonParagraph from '../SkeletonParagraph';

type SkeletonProductInfoProps = SkeletonProps & {
  showCtaBtn?: boolean;
};

const SkeletonProductInfo = ({
  count = 3,
  showCtaBtn,
  className = '',
}: SkeletonProductInfoProps) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className={`product-cart-list ${className}`}>
      {skeletons.map((_, index) => (
        <span key={index} className="skeleton-product-info">
          <Skeleton height="24" />
          <SkeletonParagraph count={1} height="2" width="18" />
          <SkeletonParagraph width="8" count={1} height="1.5" />
          <SkeletonControlList count={3} className="mini-item" />
          {showCtaBtn && <SkeletonButton />}
        </span>
      ))}
    </div>
  );
};

export default SkeletonProductInfo;
