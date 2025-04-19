import './_skeleton.scss';

export type SkeletonType = 'primary' | 'secondary' | 'img';

export type SkeletonProps = {
  className?: string;
  count?: number;
  height?: string;
  variant?: SkeletonType;
  width?: string;
};

const Skeleton = ({
  className = '',
  height = '1',
  width = '1',
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
        style={{ height: `${height}rem` }}
        className={`skeleton skeleton-${variant} ${className}`}
      />
    ))
  );

export default Skeleton;
