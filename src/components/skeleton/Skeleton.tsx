import './_skeleton.scss';

type SkeletonType = 'primary' | 'img';

export type SkeletonProps = {
  className?: string;
  count?: number;
  height?: string;
  variant?: SkeletonType;
  width?: string;
};

export type PickedSkeletonTypes = Pick<
  SkeletonProps,
  'count' | 'height' | 'width'
>;

const Skeleton = ({
  className = '',
  height = '',
  width = '',
  count,
  variant = 'primary',
}: SkeletonProps) =>
  !count ? (
    <span
      style={{ height: `${height}rem`, width: `${width}rem` }}
      className={`skeleton skeleton-${variant}  ${className}`}
    />
  ) : (
    Array.from({ length: count }).map((_, index) => (
      <span
        key={index}
        style={{ height: `${height}rem`, width: `${width}rem` }}
        className={`skeleton skeleton-${variant} ${className}`}
      />
    ))
  );

export default Skeleton;
