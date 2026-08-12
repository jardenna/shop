import Skeleton, { SkeletonProps } from '../Skeleton';
import SkeletonButton from '../SkeletonButton';
import SkeletonControlList from '../SkeletonControlList';
import SkeletonParagraph from '../SkeletonParagraph';

type SkeletonCollectionProps = SkeletonProps & {
  showCtaBtn?: boolean;
};

const SkeletonCollection = ({
  count = 3,
  showCtaBtn,
  className = '',
}: SkeletonCollectionProps) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className={`product-cart-list ${className}`}>
      {skeletons.map((_, index) => (
        <span key={index} className="flex flex-column">
          <Skeleton height="34" />
          <SkeletonParagraph count={1} height="2" width="18" />
          <SkeletonParagraph width="8" count={1} height="1.5" />
          <SkeletonControlList count={3} className="mini-item" />
          {showCtaBtn && <SkeletonButton />}
        </span>
      ))}
    </div>
  );
};

export default SkeletonCollection;
