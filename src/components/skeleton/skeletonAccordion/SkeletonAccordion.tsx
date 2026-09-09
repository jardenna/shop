import Skeleton, { SkeletonProps } from '../Skeleton';
import './_skeleton-accordion.scss';

const SkeletonAccordion = ({ count = 4 }: SkeletonProps) => (
  <div>
    {Array.from({ length: count }).map((_, index) => (
      <div className="skeleton-accordion-item" key={index}>
        <Skeleton className="skeleton-accordion-title" />
        <Skeleton className="skeleton-accordion-chevron" />
      </div>
    ))}
  </div>
);

export default SkeletonAccordion;
